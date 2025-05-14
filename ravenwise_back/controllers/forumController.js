const asyncHandler = require('../utils/asyncHandler');

// Fonctions temporaires pour faire fonctionner les routes
exports.getAllDiscussions = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: [],
    message: "Fonctionnalité en cours de développement"
  });
});

exports.getDiscussionById = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: {},
    message: "Fonctionnalité en cours de développement"
  });
});

exports.createDiscussion = asyncHandler(async (req, res) => {
  res.status(201).json({
    success: true,
    message: "Fonctionnalité en cours de développement"
  });
});

exports.addReply = asyncHandler(async (req, res) => {
  res.status(201).json({
    success: true,
    message: "Fonctionnalité en cours de développement"
  });
});

exports.likeDiscussion = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Fonctionnalité en cours de développement"
  });
});

exports.unlikeDiscussion = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Fonctionnalité en cours de développement"
  });
});