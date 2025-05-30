const express = require('express');
const router = express.Router();
const { templates, styles } = require('../config/templates');

// Récupérer tous les templates
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: templates
  });
});

// Récupérer un template spécifique
router.get('/:id', (req, res) => {
  const template = templates.find(t => t.id === req.params.id);
  
  if (!template) {
    return res.status(404).json({
      success: false,
      message: 'Template non trouvé'
    });
  }

  res.json({
    success: true,
    data: template
  });
});

// Récupérer les styles disponibles
router.get('/styles/colors', (req, res) => {
  res.json({
    success: true,
    data: styles.colors
  });
});

router.get('/styles/fonts', (req, res) => {
  res.json({
    success: true,
    data: styles.fonts
  });
});

module.exports = router; 