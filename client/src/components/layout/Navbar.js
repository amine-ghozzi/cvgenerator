import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container
} from '@mui/material';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'bold'
            }}
          >
            CV Generator
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              component={Link}
              to="/cv"
              color="inherit"
              sx={{
                fontWeight: isActive('/cv') ? 'bold' : 'normal',
                borderBottom: isActive('/cv') ? '2px solid white' : 'none'
              }}
            >
              Créer CV
            </Button>
            <Button
              component={Link}
              to="/job"
              color="inherit"
              sx={{
                fontWeight: isActive('/job') ? 'bold' : 'normal',
                borderBottom: isActive('/job') ? '2px solid white' : 'none'
              }}
            >
              Analyser Offre
            </Button>
            <Button
              component={Link}
              to="/templates"
              color="inherit"
              sx={{
                fontWeight: isActive('/templates') ? 'bold' : 'normal',
                borderBottom: isActive('/templates') ? '2px solid white' : 'none'
              }}
            >
              Templates
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar; 