import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'RavenWise | la plateforme d\'apprentissage adaptatif',
  description: 'RavenWise est une plateforme d\'apprentissage innovante qui utilise l\'intelligence artificielle pour personnaliser votre parcours éducatif et vous aider à atteindre vos objectifs.',
  keywords: 'RavenWise, apprentissage adaptatif, IA, plateforme d\'apprentissage, cours en ligne, communauté',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}