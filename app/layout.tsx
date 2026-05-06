
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/navbar'; 
import Footer from './components/footer'; 

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lossie - Lost & Found Tracker',
  description: 'AI-powered lost and found tracker.',
  icons: {
    icon: '/logoURL.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Navbar /> {/* This will appear on every page */}
        <main className="flex-grow">
          {children} 
        </main>
        <Footer />
      </body>
    </html>
  );
}