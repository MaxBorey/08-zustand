import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "../components/Header/Header";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";
import Footer from '../components/Footer/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NoteHub - Your Notes App',
  description: 'Manage your notes efficiently with NoteHub',
  openGraph: {
    title: 'NoteHub - Your Notes App',
    description: 'Manage your notes efficiently with NoteHub',
    url: `https://notehub.com/`,
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub - Your Notes App',
      },
    ],
    type: 'article',
  },
};

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
