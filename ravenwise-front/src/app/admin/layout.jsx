"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useClerkAuth } from "../../context/clerkContext";
import AdminGuard from "../../components/admin/AdminGuard";
import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import RavenWiseLogo from "../../assets/images/Ravenwise.png";
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  return (
    <AdminGuard>
      <div className="flex h-screen bg-[#0c1524]">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}

// Barre latérale admin avec navigation
function AdminSidebar() {
  const pathname = usePathname();
  
  const navigationItems = [
    { label: "Tableau de bord", href: "/admin", icon: "📊" },
    { label: "Cours", href: "/admin/courses", icon: "📚" },
    { label: "Utilisateurs", href: "/admin/users", icon: "👥" },
    { label: "Forum", href: "/admin/forum", icon: "💬" },
    { label: "Statistiques", href: "/admin/statistics", icon: "📈" },
  ];
  
  const isActive = (href) => pathname === href || pathname.startsWith(`${href}/`);
  
  return (
    <div className="w-64 bg-[#0f1b2a] border-r border-gray-800 h-full overflow-y-auto">
      <div className="p-4">
        <Link href="/admin" className="flex items-center justify-center mb-8">
          <Image 
            src={RavenWiseLogo} 
            alt="RavenWise Admin" 
            width={150} 
            height={45} 
          />
        </Link>
        
        <nav>
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? "bg-[#182b4a] text-[#FDC758]"
                      : "text-gray-400 hover:bg-[#182b4a]/50 hover:text-white"
                  }`}
                >
                  <span className="mr-3 text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      <div className="mt-auto p-4 border-t border-gray-800">
        <Link href="/" className="flex items-center p-3 text-gray-400 hover:text-white">
          <span className="mr-3">🏠</span>
          <span>Retour au site</span>
        </Link>
      </div>
    </div>
  );
}

// En-tête admin
function AdminHeader() {
  return (
    <header className="bg-[#0f1b2a] border-b border-gray-800 py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold text-white">Administration RavenWise</h1>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-400 hover:text-white">
          <span className="text-xl">🔔</span>
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            2
          </span>
        </button>
        
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}