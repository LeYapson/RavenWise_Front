import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider as CustomClerkProvider } from '../context/clerkContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'RavenWise | la plateforme d\'apprentissage adaptatif',
  description: 'RavenWise est une plateforme d\'apprentissage innovante qui utilise l\'intelligence artificielle pour personnaliser votre parcours éducatif et vous aider à atteindre vos objectifs.',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="fr">
        <body className={inter.className}>
          <CustomClerkProvider>
            {children}
          </CustomClerkProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}