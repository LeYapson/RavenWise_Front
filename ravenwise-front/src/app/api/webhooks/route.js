import { Webhook } from 'svix';
import { NextResponse } from 'next/server';
import { webhookService } from '../../../services/webhook-api';

export async function POST(req) {
  console.log("Webhook reçu");
  
  try {
    // 1. Récupérer le corps de la requête
    const payload = await req.text();
    
    // 2. Utiliser req.headers au lieu de headers() pour éviter les avertissements
    const svixId = req.headers.get("svix-id");
    const svixTimestamp = req.headers.get("svix-timestamp");
    const svixSignature = req.headers.get("svix-signature");
    
    console.log("En-têtes:", {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature?.slice(0, 10) + "..."
    });
    
    // 3. Vérifier que les en-têtes requis sont présents
    if (!svixId || !svixTimestamp || !svixSignature) {
      console.error("En-têtes Svix manquants");
      return NextResponse.json(
        { error: "En-têtes de vérification manquants" },
        { status: 400 }
      );
    }
    
    // 4. Vérifier la signature
    const secret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
    console.log("Secret de signature:", secret ? "Défini" : "Non défini");
    
    const wh = new Webhook(secret);
    let evt;
    
    try {
      evt = wh.verify(payload, {
        "svix-id": svixId,
        "svix-timestamp": svixTimestamp,
        "svix-signature": svixSignature
      });
    } catch (err) {
      console.error("Erreur de vérification Svix:", err.message);
      return NextResponse.json(
        { error: "Signature invalide" },
        { status: 400 }
      );
    }
    
    // 5. Traiter l'événement
    const webhookBody = JSON.parse(payload);
    console.log(`Webhook vérifié: ${webhookBody.type}`);
    
    // 6. Traiter selon le type d'événement
    if (webhookBody.type === 'user.created') {
      console.log("Traitement de user.created");
      
      const userData = {
        clerkId: webhookBody.data.id,
        firstName: webhookBody.data.first_name || '',
        lastName: webhookBody.data.last_name || '',
        email: webhookBody.data.email_addresses?.[0]?.email_address || '',
        role: webhookBody.data.public_metadata?.role || 'free',
      };
      
      console.log("Données utilisateur à créer:", userData);
      
      try {
        const result = await webhookService.createUser(userData);
        console.log("Utilisateur créé avec succès:", result);
      } catch (apiError) {
        console.error("Erreur détaillée lors de la création de l'utilisateur:", {
          message: apiError.message,
          response: apiError.response?.data || "Pas de données de réponse"
        });
        
        // Ne pas échouer le webhook pour les erreurs API
        // Renvoyer quand même un succès pour éviter les retentatives
        return NextResponse.json(
          { success: false, message: "Erreur lors de la création de l'utilisateur" },
          { status: 200 }  // 200 pour que Clerk ne réessaie pas
        );
      }
    }
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Erreur webhook générale:", {
      message: err.message,
      stack: err.stack
    });
    return NextResponse.json(
      { error: err.message || "Erreur inconnue" },
      { status: 400 }
    );
  }
}