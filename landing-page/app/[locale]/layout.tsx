import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';

import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { WalletContextProvider } from '../../components/providers/WalletContextProvider';
import '../globals.css';
import { Montserrat, Outfit } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

export const metadata = {
  title: 'Luxor Economy',
  description: 'Building the future of LATAM and US integration on the blockchain.',
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <body className={`${montserrat.variable} ${outfit.variable} ${montserrat.className} bg-black text-white min-h-screen flex flex-col font-sans`}>
        <WalletContextProvider>
          <NextIntlClientProvider messages={messages}>
            <Navbar />
            <main className="flex-grow pt-16">
              {children}
            </main>
            <Footer />
          </NextIntlClientProvider>
        </WalletContextProvider>
      </body>
    </html>
  );
}
