import * as admin from 'firebase-admin';

const getFirebaseAdmin = () => {
    if (!admin.apps.length) {
        try {
            let privateKey = process.env.FIREBASE_PRIVATE_KEY || '';
            
            // Fix for PEM formatting
            if (privateKey && !privateKey.includes('\n')) {
                privateKey = privateKey.replace(/\\n/g, '\n');
            }
            
            // Remove extra quotes if present
            if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
                privateKey = privateKey.slice(1, -1);
            }

            if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && privateKey) {
                admin.initializeApp({
                    credential: admin.credential.cert({
                        projectId: process.env.FIREBASE_PROJECT_ID,
                        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                        privateKey: privateKey,
                    }),
                });
            } else {
                console.warn('⚠️ Firebase Admin credentials missing, skipping initialization.');
            }
        } catch (error: any) {
            console.error('⚠️ Firebase Admin Init Error:', error.message);
        }
    }
    return admin;
};

// Safe DB access
export const getDb = () => {
    const app = getFirebaseAdmin();
    if (app.apps.length > 0) {
        return app.firestore();
    }
    return null;
};
