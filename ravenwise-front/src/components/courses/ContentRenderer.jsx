"use client";

import React from 'react';

export default function ContentRenderer({ content }) {
  if (!content) {
    return <div>Contenu non disponible</div>;
  }
  
  return (
    <div 
      className="prose prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}