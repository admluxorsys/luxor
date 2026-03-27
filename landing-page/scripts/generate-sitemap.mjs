// scripts/generate-sitemap.mjs
import fs from 'fs';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const locales = ['en', 'es', 'fr', 'pt', 'de', 'zh', 'ja', 'ru'];
const staticSections = [
    '',
    '/integrations',
    '/coming-soon',
    '/community',
    '/excelsior',
    '/intelligent-glasses',
    '/lux-origin',
    '/luxor',
    '/luxor-pay',
    '/roadmap',
    '/stablecoin',
    '/team'
];

async function generate() {
    console.log('--- Generating Sitemap ---');

    // Attempt to initialize with whatever we have
    if (!getApps().length) {
        if (process.env.FIREBASE_PROJECT_ID) {
            try {
                let privateKey = process.env.FIREBASE_PRIVATE_KEY || '';
                // The replacement logic that usually works for Vercel/Dotenv
                privateKey = privateKey.replace(/\\n/g, '\n').replace(/"/g, '');

                initializeApp({
                    credential: cert({
                        projectId: process.env.FIREBASE_PROJECT_ID,
                        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                        privateKey: privateKey,
                    }),
                });
                console.log('✅ Firebase Admin Initialized');
            } catch (err) {
                console.warn('⚠️ Firebase Init Warning:', err.message);
            }
        }
    }

    const sitemapEntries = [];
    const baseUrl = 'https://byluxor.com';

    // 1. Static Routes
    for (const locale of locales) {
        for (const section of staticSections) {
            sitemapEntries.push({
                loc: `${baseUrl}/${locale}${section}`,
                lastmod: new Date().toISOString().split('T')[0],
                priority: section === '' ? '1.0' : '0.8',
            });
        }
    }

    // 2. Dynamic Routes (Integrations)
    if (getApps().length) {
        try {
            const db = getFirestore();
            const snapshot = await db.collection('integrations').get();
            
            snapshot.forEach(doc => {
                const data = doc.data();
                const id = doc.id;
                const updatedAt = data.updatedAt ? (data.updatedAt.toDate ? data.updatedAt.toDate() : new Date(data.updatedAt)) : new Date();
                const lastmod = updatedAt.toISOString().split('T')[0];

                for (const locale of locales) {
                    sitemapEntries.push({
                        loc: `${baseUrl}/${locale}/integrations/${id}`,
                        lastmod: lastmod,
                        priority: '0.6',
                    });
                }
            });
        } catch (error) {
            console.error('❌ Firestore Fetch Error:', error.message);
        }
    }

    // 3. Construct XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map(entry => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    fs.writeFileSync('./public/sitemap.xml', xml);
    console.log(`✅ sitemap.xml saved with ${sitemapEntries.length} items`);
}

generate().catch(console.error);
