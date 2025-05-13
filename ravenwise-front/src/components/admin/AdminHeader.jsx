// src/components/admin/AdminHeader.jsx
"use client";
import React from "react";
import { UserButton, useUser } from "@clerk/nextjs";

const AdminHeader = () => {
  const { user } = useUser();
  
  return (
    <header className="bg-[#0f1b2a] border-b border-gray-800 py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold text-white">Administration RavenWise</h1>
      
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-white">
          <span className="text-xl">🔔</span>
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </button>
        
        {/* Profil utilisateur */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <div className="text-sm text-white">{user?.fullName || user?.primaryEmailAddress?.emailAddress}</div>
            <div className="text-xs text-gray-400">Administrateur</div>
          </div>
          
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;