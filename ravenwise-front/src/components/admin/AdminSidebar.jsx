// src/components/admin/AdminSidebar.jsx
"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import RavenWiseLogo from "../../assets/images/Ravenwise.png";

const AdminSidebar = () => {
  const pathname = usePathname();
  
  const navigationItems = [
    { label: "Dashboard", href: "/admin", icon: "📊" },
    { label: "Utilisateurs", href: "/admin/users", icon: "👥" },
    { label: "Cours", href: "/admin/courses", icon: "📚" },
    { label: "Quiz", href: "/admin/quizzes", icon: "❓" },
    { label: "Communauté", href: "/admin/community", icon: "💬" },
    { label: "Statistiques", href: "/admin/statistics", icon: "📈" },
    { label: "Paramètres", href: "/admin/settings", icon: "⚙️" },
  ];
  
  const isActive = (href) => pathname === href || pathname.startsWith(`${href}/`);
  
  return (
    <div className="w-64 bg-[#0f1b2a] h-full overflow-y-auto border-r border-gray-800">
      <div className="p-4">
        {/* Logo */}
        <Link href="/admin" className="flex items-center justify-center mb-8">
          <Image src={RavenWiseLogo} alt="RavenWise Admin" width={150} height={45} />
        </Link>
        
        {/* Navigation */}
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
        <Link href="/dashboard" className="flex items-center p-3 text-gray-400 hover:text-white">
          <span className="mr-3">🏠</span>
          <span>Retour au site</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;