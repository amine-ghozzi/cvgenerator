const templates = [
  {
    id: 'modern',
    name: 'Moderne',
    description: 'Design épuré et professionnel avec une mise en page moderne',
    thumbnail: '/templates/modern.png',
    sections: [
      'header',
      'summary',
      'experience',
      'education',
      'skills',
      'languages',
      'certifications'
    ]
  },
  {
    id: 'classic',
    name: 'Classique',
    description: 'Style traditionnel et élégant, parfait pour les secteurs conservateurs',
    thumbnail: '/templates/classic.png',
    sections: [
      'header',
      'summary',
      'experience',
      'education',
      'skills',
      'languages'
    ]
  },
  {
    id: 'creative',
    name: 'Créatif',
    description: 'Design moderne et dynamique, idéal pour les secteurs créatifs',
    thumbnail: '/templates/creative.png',
    sections: [
      'header',
      'summary',
      'experience',
      'education',
      'skills',
      'projects',
      'languages'
    ]
  },
  {
    id: 'minimal',
    name: 'Minimaliste',
    description: 'Design simple et efficace, mettant l\'accent sur le contenu',
    thumbnail: '/templates/minimal.png',
    sections: [
      'header',
      'experience',
      'education',
      'skills'
    ]
  }
];

const styles = {
  colors: [
    {
      id: 'blue',
      name: 'Bleu',
      primary: '#2c3e50',
      secondary: '#3498db',
      accent: '#2980b9'
    },
    {
      id: 'green',
      name: 'Vert',
      primary: '#27ae60',
      secondary: '#2ecc71',
      accent: '#16a085'
    },
    {
      id: 'purple',
      name: 'Violet',
      primary: '#8e44ad',
      secondary: '#9b59b6',
      accent: '#6c3483'
    },
    {
      id: 'red',
      name: 'Rouge',
      primary: '#c0392b',
      secondary: '#e74c3c',
      accent: '#a93226'
    }
  ],
  fonts: [
    {
      id: 'roboto',
      name: 'Roboto',
      family: 'Roboto, sans-serif'
    },
    {
      id: 'open-sans',
      name: 'Open Sans',
      family: 'Open Sans, sans-serif'
    },
    {
      id: 'lato',
      name: 'Lato',
      family: 'Lato, sans-serif'
    },
    {
      id: 'montserrat',
      name: 'Montserrat',
      family: 'Montserrat, sans-serif'
    }
  ]
};

module.exports = {
  templates,
  styles
}; 