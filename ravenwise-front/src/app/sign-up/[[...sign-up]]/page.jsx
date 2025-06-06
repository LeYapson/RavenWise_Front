// src/app/sign-up/[[...sign-up]]/page.jsx
"use client";

import { useState } from "react";
import { SignUp, useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import RavenWiseLogo from "../../../assets/images/Ravenwise.png"; // Ajustez le chemin

export default function CustomSignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifyingEmail, setVerifyingEmail] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      setError("");
      setLoading(true);

      // Étape 1: Créer un utilisateur avec seulement les paramètres essentiels valides
      await signUp.create({
        emailAddress: email,
        password,
      });

      // Étape 3: Démarrer la vérification de l'email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Passer à l'étape de vérification
      setVerifyingEmail(true);
      setLoading(false);
    } catch (err) {
      console.error("Erreur d'inscription:", err);
      setError(err.errors?.[0]?.message || "Une erreur s'est produite lors de l'inscription.");
      setLoading(false);
    }
  };

  const verifyEmail = async (e) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      setError("");
      setLoading(true);

      // Vérifier le code
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status !== "complete") {
        setError("La vérification a échoué. Veuillez réessayer.");
        setLoading(false);
        return;
      }

      // Activer la session
      await setActive({ session: completeSignUp.createdSessionId });

      // Redirection après inscription
      router.push("/dashboard");
    } catch (err) {
      console.error("Erreur de vérification:", err);
      setError("Code de vérification incorrect");
      setLoading(false);
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
      <div className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="bg-[#182b4a] rounded-2xl shadow-xl border border-gray-700 p-8">
            {!verifyingEmail ? (
              <>
                <h2 className="text-2xl font-bold text-center mb-2">Créer un compte</h2>
                <p className="text-gray-300 text-center mb-6">Rejoignez RavenWise dès aujourd'hui</p>

                {error && (
                  <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
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
                    <label htmlFor="password" className="block text-sm font-medium mb-2">
                      Mot de passe
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-[#1D2D40] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#FDC758]"
                      required
                    />
                    <p className="mt-1 text-xs text-gray-400">
                      Le mot de passe doit contenir au moins 8 caractères
                    </p>
                  </div>

                  {/* Ajouter cet élément pour le CAPTCHA */}
                  <div id="clerk-captcha" className="mt-4"></div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#FDC758] text-[#0F1B2A] py-3 px-4 rounded-lg font-medium transition-colors hover:bg-opacity-90 disabled:opacity-50 mt-4"
                  >
                    {loading ? "Création en cours..." : "Créer un compte"}
                  </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-400">
                  Déjà un compte?{" "}
                  <Link href="/sign-in" className="text-[#FDC758] hover:underline font-medium">
                    Se connecter
                  </Link>
                </p>
              </>
            ) : (
              /* Formulaire de vérification du code */
              <>
                <h2 className="text-2xl font-bold text-center mb-2">Vérifier votre email</h2>
                <p className="text-gray-300 text-center mb-6">
                  Nous avons envoyé un code à {email}
                </p>

                {error && (
                  <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
                    {error}
                  </div>
                )}

                <form onSubmit={verifyEmail} className="space-y-6">
                  <div>
                    <label htmlFor="code" className="block text-sm font-medium mb-2">
                      Code de vérification
                    </label>
                    <input
                      id="code"
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-[#1D2D40] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#FDC758] text-center text-xl tracking-widest"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#FDC758] text-[#0F1B2A] py-3 px-4 rounded-lg font-medium transition-colors hover:bg-opacity-90 disabled:opacity-50"
                  >
                    {loading ? "Vérification..." : "Vérifier le code"}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <button
                    onClick={async () => {
                      try {
                        await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
                        alert("Un nouveau code a été envoyé à votre adresse email.");
                      } catch (err) {
                        setError("Impossible d'envoyer un nouveau code pour le moment.");
                      }
                    }}
                    className="text-[#FDC758] hover:underline text-sm"
                  >
                    Renvoyer le code
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}