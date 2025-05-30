import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import WorkIcon from '@mui/icons-material/Work';
import PaletteIcon from '@mui/icons-material/Palette';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <DescriptionIcon />
            CV Generator
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              color="inherit"
              component={RouterLink}
              to="/cv-form"
              startIcon={<DescriptionIcon />}
            >
              Créer CV
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/job-extractor"
              startIcon={<WorkIcon />}
            >
              Extraire Offre
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/templates"
              startIcon={<PaletteIcon />}
            >
              Templates
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 