// src/app/api/users/set-admin/route.js
import { clerkClient } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { userId } = auth();
  
  // Vérifier si l'utilisateur actuel est déjà administrateur
  // Cette vérification serait idéalement plus robuste dans une application en production
  const currentUser = await clerkClient.users.getUser(userId);
  if (currentUser.publicMetadata.role !== "admin") {
    return NextResponse.json(
      { error: "Non autorisé" }, 
      { status: 403 }
    );
  }
  
  // Récupérer l'utilisateur cible depuis la requête
  const { targetUserId, role } = await request.json();
  
  if (!targetUserId || !role) {
    return NextResponse.json(
      { error: "ID utilisateur et rôle requis" }, 
      { status: 400 }
    );
  }
  
  try {
    // Mettre à jour les métadonnées publiques de l'utilisateur cible
    await clerkClient.users.updateUser(targetUserId, {
      publicMetadata: { role },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du rôle:", error);
    return NextResponse.json(
      { error: "Erreur serveur" }, 
      { status: 500 }
    );
  }
}