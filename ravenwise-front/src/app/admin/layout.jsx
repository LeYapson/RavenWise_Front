// src/app/admin/layout.jsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";

export default function AdminLayout({ children }) {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  // Vérification si l'utilisateur est administrateur
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (isLoaded && isSignedIn) {
        try {
          const response = await fetch("/api/users/check-admin");
          const data = await response.json();
          
          setIsAdmin(data.isAdmin);
          
          if (!data.isAdmin) {
            router.push("/dashboard");
          }
        } catch (error) {
          console.error("Erreur lors de la vérification du statut admin:", error);
          router.push("/dashboard");
        }
      } else if (isLoaded && !isSignedIn) {
        router.push("/sign-in");
      }
      
      setLoading(false);
    };

    checkAdminStatus();
  }, [isLoaded, isSignedIn, router]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  }

  if (!isAdmin) {
    return null; // Le router nous redirigera
  }

  return (
    <div className="flex h-screen bg-[#0c1524]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-6 bg-[#0c1524] text-white">
          {children}
        </main>
      </div>
    </div>
  );
}