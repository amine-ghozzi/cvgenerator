import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import axios from 'axios';

const TemplateSelector = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [colors, setColors] = useState([]);
  const [fonts, setFonts] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedFont, setSelectedFont] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [templatesRes, colorsRes, fontsRes] = await Promise.all([
          axios.get('/api/templates'),
          axios.get('/api/templates/styles/colors'),
          axios.get('/api/templates/styles/fonts')
        ]);

        setTemplates(templatesRes.data.data);
        setColors(colorsRes.data.data);
        setFonts(fontsRes.data.data);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      }
    };

    fetchData();
  }, []);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setOpenDialog(true);
  };

  const handleConfirm = () => {
    if (selectedTemplate && selectedColor && selectedFont) {
      // Stocker les préférences dans le localStorage
      localStorage.setItem('templatePreferences', JSON.stringify({
        template: selectedTemplate,
        color: selectedColor,
        font: selectedFont
      }));
      navigate('/cv-form');
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Choisissez votre template
      </Typography>

      <Grid container spacing={3}>
        {templates.map((template) => (
          <Grid item xs={12} sm={6} md={4} key={template.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  cursor: 'pointer'
                }
              }}
              onClick={() => handleTemplateSelect(template)}
            >
              <CardMedia
                component="img"
                height="200"
                image={template.thumbnail}
                alt={template.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {template.name}
                </Typography>
                <Typography color="text.secondary">
                  {template.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Personnaliser votre template</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Couleur</InputLabel>
              <Select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                label="Couleur"
              >
                {colors.map((color) => (
                  <MenuItem key={color.id} value={color.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          backgroundColor: color.primary,
                          borderRadius: '50%'
                        }}
                      />
                      {color.name}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Police</InputLabel>
              <Select
                value={selectedFont}
                onChange={(e) => setSelectedFont(e.target.value)}
                label="Police"
              >
                {fonts.map((font) => (
                  <MenuItem key={font.id} value={font.id}>
                    <Typography style={{ fontFamily: font.family }}>
                      {font.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Annuler</Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            disabled={!selectedColor || !selectedFont}
          >
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TemplateSelector; 