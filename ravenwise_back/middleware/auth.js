const { clerkClient, ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
require('dotenv').config();

// Clé secrète pour JWT
const JWT_SECRET = process.env.JWT_SECRET || 'votre_clé_secrète_temporaire';

// Middleware d'authentification Clerk
const clerkAuth = ClerkExpressRequireAuth();

// Middleware pour extraire les infos utilisateur Clerk
const extractUserInfo = asyncHandler(async (req, res, next) => {
  if (!req.auth?.userId) {
    return next();
  }
  
  try {
    const user = await clerkClient.users.getUser(req.auth.userId);
    req.user = {
      id: user.id,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.emailAddresses[0]?.emailAddress || '',
      role: user.publicMetadata?.role || 'user',
      imageUrl: user.imageUrl,
    };
    next();
  } catch (error) {
    console.error('Erreur récupération utilisateur:', error);
    req.user = { id: req.auth.userId };
    next();
  }
});

// JWT middleware standard
const authMiddleware = async (req, res, next) => {
  try {
    // Récupérer le token du header Authorization
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, error: 'Token manquant' });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        return res.status(401).json({ success: false, error: 'Utilisateur introuvable' });
      }
      
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ success: false, error: 'Token invalide' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
};

// Vérification des rôles
const requireRole = (role) => {
  return (req, res, next) => {
    // Vérifier si l'utilisateur est authentifié
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        error: 'Non authentifié'
      });
    }
    
    // Récupérer le rôle de l'utilisateur
    const userRole = req.user.role;
    
    // Admin peut tout faire
    if (userRole === 'admin') return next();
    
    // Instructeur peut accéder aux ressources instructeur
    if (role === 'instructor' && userRole === 'instructor') return next();
    
    // Utilisateur standard pour les ressources utilisateur
    if (role === 'user' && ['user', 'instructor', 'admin'].includes(userRole)) return next();
    
    // Accès refusé pour tous les autres cas
    return res.status(403).json({
      success: false,
      error: 'Accès refusé - Rôle requis: ' + role
    });
  };
};

// Générer un token JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role }, 
    JWT_SECRET, 
    { expiresIn: '30d' }
  );
};

// Exporter tous les middlewares de façon cohérente
module.exports = { 
  // Middleware Clerk
  clerkAuth,
  extractUserInfo,
  
  // Middleware JWT
  authMiddleware,
  generateToken,
  
  // Middleware commun
  requireRole
};