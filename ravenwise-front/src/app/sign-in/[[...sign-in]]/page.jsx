// src/app/sign-in/[[...sign-in]]/page.jsx
"use client";

import { SignIn, useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import RavenWiseLogo from "../../../assets/images/Ravenwise.png"; // Ajustez le chemin

export default function SignInPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Gérer la connexion par email/mot de passe
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      setError("");
      setLoading(true);

      // Première étape : vérifier si l'email existe
      const result = await signIn.create({
        identifier: email,
        password,
      });

      // Vérifier si un MFA est nécessaire (2FA)
      if (result.status === "needs_second_factor") {
        // Rediriger vers une page de 2FA (à créer si nécessaire)
        router.push("/sign-in/2fa");
        return;
      }

      // Si tout est ok, activer la session
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        // Redirection après connexion
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Erreur de connexion:", err);
      setError("Email ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };

  // Gérer la connexion avec Google
  const signInWithGoogle = async () => {
    if (!isLoaded) return;

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
    } catch (err) {
      console.error("Erreur connexion Google:", err);
      setError("La connexion avec Google a échoué");
    }
  };

  // Gérer la connexion avec GitHub
  const signInWithGitHub = async () => {
    if (!isLoaded) return;

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_github",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
    } catch (err) {
      console.error("Erreur connexion GitHub:", err);
      setError("La connexion avec GitHub a échoué");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0c1524] text-white">
      {/* Header avec logo */}
      <div className="py-6 px-4 flex justify-center">
        <Link href="/">
          <Image
            src={RavenWiseLogo}
            alt="RavenWise"
            width={150}
            height={45}
            priority
          />
        </Link>
      </div>

      {/* Contenu principal */}
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-[#182b4a] rounded-2xl shadow-xl border border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-center mb-2">Connexion</h2>
            <p className="text-gray-300 text-center mb-6">
              Bienvenue sur RavenWise
            </p>

            {error && (
              <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Adresse email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#1D2D40] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#FDC758]"
                  placeholder="votre@email.com"
                  required
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium"
                  >
                    Mot de passe
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-[#FDC758] hover:underline"
                  >
                    Mot de passe oublié?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#1D2D40] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#FDC758]"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FDC758] text-[#0F1B2A] py-3 px-4 rounded-lg font-medium transition-colors hover:bg-opacity-90 disabled:opacity-50"
              >
                {loading ? "Connexion en cours..." : "Se connecter"}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#182b4a] text-gray-400">Ou</span>
              </div>
            </div>

            {/* Boutons de connexion sociale */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={signInWithGoogle}
                className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors hover:bg-gray-100"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continuer avec Google
              </button>

              <button
                type="button"
                onClick={signInWithGitHub}
                className="w-full flex items-center justify-center gap-3 bg-gray-800 text-white py-3 px-4 rounded-lg font-medium transition-colors hover:bg-gray-700"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
                  />
                </svg>
                Continuer avec GitHub
              </button>
            </div>

            <p className="mt-8 text-center text-sm text-gray-400">
              Pas encore de compte?{" "}
              <Link
                href="/sign-up"
                className="text-[#FDC758] hover:underline font-medium"
              >
                S'inscrire
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}