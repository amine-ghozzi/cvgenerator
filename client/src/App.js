import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';

// Composants
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import CVForm from './components/cv/CVForm';
import JobExtractor from './components/job/JobExtractor';
import TemplateSelector from './components/templates/TemplateSelector';
import CVPreview from './components/cv/CVPreview';

// Thème personnalisé
const theme = createTheme({
  palette: {
    primary: {
      main: '#2c3e50',
    },
    secondary: {
      main: '#3498db',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cv" element={<CVForm />} />
            <Route path="/job" element={<JobExtractor />} />
            <Route path="/templates" element={<TemplateSelector />} />
            <Route path="/preview" element={<CVPreview />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App; 