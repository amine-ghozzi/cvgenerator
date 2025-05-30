import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import axios from 'axios';

const JobExtractor = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jobData, setJobData] = useState(null);
  const [jobDescription, setJobDescription] = useState('');

  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setJobData(null);

    try {
      const response = await axios.post('/api/job/extract', { url });
      setJobData(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Une erreur est survenue lors de l\'extraction de l\'offre');
    } finally {
      setLoading(false);
    }
  };

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setJobData(null);

    try {
      const response = await axios.post('/api/job/analyze', { description: jobDescription });
      setJobData(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Une erreur est survenue lors de l\'analyse du texte');
    } finally {
      setLoading(false);
    }
  };

  const handleUseJob = () => {
    if (jobData) {
      localStorage.setItem('jobData', JSON.stringify(jobData));
      navigate('/cv');
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Analyser une offre d'emploi
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Via URL
        </Typography>
        <form onSubmit={handleUrlSubmit}>
          <TextField
            fullWidth
            label="URL de l'offre d'emploi"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.example.com/job/123"
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={loading || !url}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? 'Extraction en cours...' : 'Analyser l\'URL'}
          </Button>
        </form>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Via texte
        </Typography>
        <form onSubmit={handleTextSubmit}>
          <TextField
            fullWidth
            multiline
            rows={6}
            label="Description du poste"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Collez ici la description complète du poste..."
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={loading || !jobDescription}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? 'Analyse en cours...' : 'Analyser le texte'}
          </Button>
        </form>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {jobData && (
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {jobData.title}
            </Typography>
            {jobData.company && (
              <Typography color="text.secondary" gutterBottom>
                {jobData.company}
              </Typography>
            )}
            {jobData.location && (
              <Typography color="text.secondary" gutterBottom>
                {jobData.location}
              </Typography>
            )}
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mb: 2 }}>
              {jobData.description}
            </Typography>
            {jobData.skills && jobData.skills.length > 0 && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Compétences requises
                </Typography>
                <List>
                  {jobData.skills.map((skill, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={skill} />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
            {jobData.requirements && jobData.requirements.length > 0 && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Prérequis
                </Typography>
                <List>
                  {jobData.requirements.map((req, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={req} />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              onClick={handleUseJob}
              fullWidth
            >
              Utiliser cette offre pour créer un CV
            </Button>
          </CardActions>
        </Card>
      )}
    </Box>
  );
};

export default JobExtractor; 