import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Alert,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const validationSchema = Yup.object({
  personalInfo: Yup.object({
    firstName: Yup.string().required('Prénom requis'),
    lastName: Yup.string().required('Nom requis'),
    email: Yup.string().email('Email invalide').required('Email requis'),
    phone: Yup.string().required('Téléphone requis'),
    location: Yup.string().required('Localisation requise')
  }),
  summary: Yup.string().required('Résumé requis'),
  experiences: Yup.array().of(
    Yup.object({
      title: Yup.string().required('Titre requis'),
      company: Yup.string().required('Entreprise requise'),
      startDate: Yup.date().required('Date de début requise'),
      endDate: Yup.date(),
      description: Yup.string().required('Description requise')
    })
  ),
  education: Yup.array().of(
    Yup.object({
      degree: Yup.string().required('Diplôme requis'),
      school: Yup.string().required('École requise'),
      startDate: Yup.date().required('Date de début requise'),
      endDate: Yup.date(),
      description: Yup.string()
    })
  ),
  skills: Yup.array().of(Yup.string()).min(1, 'Au moins une compétence requise')
});

const CVForm = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    onDrop: acceptedFiles => {
      setUploadedFile(acceptedFiles[0]);
    }
  });

  const initialValues = {
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: ''
    },
    summary: '',
    experiences: [
      {
        title: '',
        company: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ],
    education: [
      {
        degree: '',
        school: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ],
    skills: ['']
  };

  const steps = ['Informations personnelles', 'Expérience', 'Formation', 'Compétences'];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (values) => {
    try {
      // TODO: Envoyer les données au backend
      console.log(values);
      navigate('/preview');
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Créer votre CV
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box {...getRootProps()} sx={{ textAlign: 'center', p: 3, border: '2px dashed #ccc' }}>
          <input {...getInputProps()} />
          <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography>
            Glissez-déposez votre CV existant (PDF ou DOCX) ou cliquez pour sélectionner
          </Typography>
        </Box>
        {uploadedFile && (
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography>{uploadedFile.name}</Typography>
            <IconButton onClick={() => setUploadedFile(null)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
      </Paper>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            {activeStep === 0 && (
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="personalInfo.firstName"
                    label="Prénom"
                    value={values.personalInfo.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.personalInfo?.firstName && Boolean(errors.personalInfo?.firstName)}
                    helperText={touched.personalInfo?.firstName && errors.personalInfo?.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="personalInfo.lastName"
                    label="Nom"
                    value={values.personalInfo.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.personalInfo?.lastName && Boolean(errors.personalInfo?.lastName)}
                    helperText={touched.personalInfo?.lastName && errors.personalInfo?.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="personalInfo.email"
                    label="Email"
                    type="email"
                    value={values.personalInfo.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.personalInfo?.email && Boolean(errors.personalInfo?.email)}
                    helperText={touched.personalInfo?.email && errors.personalInfo?.email}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="personalInfo.phone"
                    label="Téléphone"
                    value={values.personalInfo.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.personalInfo?.phone && Boolean(errors.personalInfo?.phone)}
                    helperText={touched.personalInfo?.phone && errors.personalInfo?.phone}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="personalInfo.location"
                    label="Localisation"
                    value={values.personalInfo.location}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.personalInfo?.location && Boolean(errors.personalInfo?.location)}
                    helperText={touched.personalInfo?.location && errors.personalInfo?.location}
                  />
                </Grid>
              </Grid>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Retour
              </Button>
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  type="submit"
                >
                  Créer CV
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                >
                  Suivant
                </Button>
              )}
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CVForm; 