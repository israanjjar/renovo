import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { AuthProvider } from '@/lib/auth/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Renovo Impact Hub',
    template: '%s | Renovo Impact Hub',
  },
  description:
    'Community-driven impact platform connecting changemakers with verified environmental projects. Track your impact, vote on funding, and see where every dollar goes.',
  openGraph: {
    title: 'Renovo Impact Hub',
    description: 'Your Impact, Tracked. Your Voice, Heard.',
    type: 'website',
    siteName: 'Renovo Impact Hub',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
