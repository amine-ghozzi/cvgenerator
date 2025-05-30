import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import WorkIcon from '@mui/icons-material/Work';
import PaletteIcon from '@mui/icons-material/Palette';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Création de CV',
      description: 'Créez votre CV professionnel en quelques minutes avec notre formulaire intuitif.',
      icon: <DescriptionIcon sx={{ fontSize: 40 }} />,
      path: '/cv-form'
    },
    {
      title: 'Extraction d\'offres',
      description: 'Extrayez automatiquement les informations des offres d\'emploi depuis une URL.',
      icon: <WorkIcon sx={{ fontSize: 40 }} />,
      path: '/job-extractor'
    },
    {
      title: 'Templates personnalisables',
      description: 'Choisissez parmi plusieurs templates et personnalisez le style de votre CV.',
      icon: <PaletteIcon sx={{ fontSize: 40 }} />,
      path: '/templates'
    },
    {
      title: 'Adaptation intelligente',
      description: 'Notre IA adapte automatiquement votre CV pour correspondre parfaitement à l\'offre.',
      icon: <AutoAwesomeIcon sx={{ fontSize: 40 }} />,
      path: '/cv-form'
    }
  ];

  return (
    <Box>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          CV Generator
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Créez des CV professionnels adaptés à vos offres d'emploi grâce à l'intelligence artificielle
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/cv-form')}
          sx={{ mt: 2 }}
        >
          Commencer
        </Button>
      </Box>

      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)'
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Box sx={{ mb: 2, color: 'primary.main' }}>
                  {feature.icon}
                </Box>
                <Typography gutterBottom variant="h5" component="h2">
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => navigate(feature.path)}
                  fullWidth
                >
                  En savoir plus
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home; 