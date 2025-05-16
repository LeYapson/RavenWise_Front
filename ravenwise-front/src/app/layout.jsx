import { ClerkProvider } from '@clerk/nextjs';
import { ClerkProvider as CustomClerkProvider } from '../context/clerkContext';
import './globals.css';

export const metadata = {
  title: 'RavenWise | la plateforme d\'apprentissage adaptatif',
  description: 'RavenWise est une plateforme d\'apprentissage innovante...',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider publishableKey="pk_test_Y3VkZGx5LXNwb25nZS00My5jbGVyay5hY2NvdW50cy5kZXYk">
      <html lang="fr">
        <body>
          <CustomClerkProvider>
            {children}
          </CustomClerkProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}