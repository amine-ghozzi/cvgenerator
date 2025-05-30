import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CVPreview() {
  const navigate = useNavigate();
  const cvData = JSON.parse(localStorage.getItem('cvData') || '{}');

  const handleEdit = () => {
    navigate('/cv');
  };

  const handleDownload = () => {
    // TODO: Implémenter la logique de téléchargement
    console.log('Téléchargement du CV...');
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Aperçu du CV
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5">
              {cvData.personalInfo?.firstName} {cvData.personalInfo?.lastName}
            </Typography>
            <Typography color="text.secondary">
              {cvData.personalInfo?.email} | {cvData.personalInfo?.phone}
            </Typography>
            <Typography color="text.secondary">
              {cvData.personalInfo?.location}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Résumé
            </Typography>
            <Typography>
              {cvData.summary || 'Aucun résumé fourni'}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Expérience professionnelle
            </Typography>
            {cvData.experiences?.map((exp, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="subtitle1">
                  {exp.title} - {exp.company}
                </Typography>
                <Typography color="text.secondary">
                  {exp.startDate} - {exp.endDate || 'Présent'}
                </Typography>
                <Typography>
                  {exp.description}
                </Typography>
              </Box>
            ))}
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Formation
            </Typography>
            {cvData.education?.map((edu, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="subtitle1">
                  {edu.degree} - {edu.school}
                </Typography>
                <Typography color="text.secondary">
                  {edu.startDate} - {edu.endDate || 'Présent'}
                </Typography>
                <Typography>
                  {edu.description}
                </Typography>
              </Box>
            ))}
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Compétences
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {cvData.skills?.map((skill, index) => (
                <Paper
                  key={index}
                  sx={{
                    px: 2,
                    py: 1,
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText'
                  }}
                >
                  {skill}
                </Paper>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button
          variant="outlined"
          onClick={handleEdit}
        >
          Modifier
        </Button>
        <Button
          variant="contained"
          onClick={handleDownload}
        >
          Télécharger
        </Button>
      </Box>
    </Box>
  );
}

export default CVPreview; 