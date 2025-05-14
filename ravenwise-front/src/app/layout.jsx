import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

export const metadata = {
  title: 'RavenWise | la plateforme d\'apprentissage adaptatif',
  description: 'RavenWise est une plateforme d\'apprentissage innovante qui utilise l\'intelligence artificielle pour personnaliser votre parcours éducatif et vous aider à atteindre vos objectifs.',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="fr">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}