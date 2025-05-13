import React from "react";

export default function Card({ children, title, className = "" }) {
  return (
    <div className={`bg-[#182b4a] rounded-lg border border-gray-800 overflow-hidden shadow-lg ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-gray-800">
          <h2 className="text-lg font-medium text-white">{title}</h2>
        </div>
      )}
      <div className="p-6 text-white">
        {children}
      </div>
    </div>
  );
}