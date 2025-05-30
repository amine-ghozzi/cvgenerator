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
  CardActions
} from '@mui/material';
import axios from 'axios';

const JobExtractor = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jobData, setJobData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setJobData(null);

    try {
      const response = await axios.post('/api/job/extract', { url });
      setJobData(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleUseJob = () => {
    if (jobData) {
      // Stocker les données de l'offre dans le localStorage pour les utiliser dans le formulaire CV
      localStorage.setItem('jobData', JSON.stringify(jobData));
      navigate('/cv-form');
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Extraire une offre d'emploi
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <form onSubmit={handleSubmit}>
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
            {loading ? 'Extraction en cours...' : 'Extraire'}
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
            <Typography variant="body1" sx={{ mt: 2, whiteSpace: 'pre-wrap' }}>
              {jobData.description}
            </Typography>
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