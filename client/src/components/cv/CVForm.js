import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Formik, Form, FieldArray } from 'formik';
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
  IconButton,
  Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
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
      localStorage.setItem('cvData', JSON.stringify(values));
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
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    name="summary"
                    label="Résumé professionnel"
                    value={values.summary}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.summary && Boolean(errors.summary)}
                    helperText={touched.summary && errors.summary}
                  />
                </Grid>
              </Grid>
            )}

            {activeStep === 1 && (
              <FieldArray name="experiences">
                {({ push, remove }) => (
                  <Box>
                    {values.experiences.map((_, index) => (
                      <Paper key={index} sx={{ p: 3, mb: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Typography variant="h6">Expérience {index + 1}</Typography>
                          {index > 0 && (
                            <IconButton onClick={() => remove(index)} color="error">
                              <DeleteIcon />
                            </IconButton>
                          )}
                        </Box>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              name={`experiences.${index}.title`}
                              label="Titre du poste"
                              value={values.experiences[index].title}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.experiences?.[index]?.title && Boolean(errors.experiences?.[index]?.title)}
                              helperText={touched.experiences?.[index]?.title && errors.experiences?.[index]?.title}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              name={`experiences.${index}.company`}
                              label="Entreprise"
                              value={values.experiences[index].company}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.experiences?.[index]?.company && Boolean(errors.experiences?.[index]?.company)}
                              helperText={touched.experiences?.[index]?.company && errors.experiences?.[index]?.company}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              type="date"
                              name={`experiences.${index}.startDate`}
                              label="Date de début"
                              value={values.experiences[index].startDate}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.experiences?.[index]?.startDate && Boolean(errors.experiences?.[index]?.startDate)}
                              helperText={touched.experiences?.[index]?.startDate && errors.experiences?.[index]?.startDate}
                              InputLabelProps={{ shrink: true }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              type="date"
                              name={`experiences.${index}.endDate`}
                              label="Date de fin"
                              value={values.experiences[index].endDate}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.experiences?.[index]?.endDate && Boolean(errors.experiences?.[index]?.endDate)}
                              helperText={touched.experiences?.[index]?.endDate && errors.experiences?.[index]?.endDate}
                              InputLabelProps={{ shrink: true }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              multiline
                              rows={4}
                              name={`experiences.${index}.description`}
                              label="Description"
                              value={values.experiences[index].description}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.experiences?.[index]?.description && Boolean(errors.experiences?.[index]?.description)}
                              helperText={touched.experiences?.[index]?.description && errors.experiences?.[index]?.description}
                            />
                          </Grid>
                        </Grid>
                      </Paper>
                    ))}
                    <Button
                      startIcon={<AddIcon />}
                      onClick={() => push({
                        title: '',
                        company: '',
                        startDate: '',
                        endDate: '',
                        description: ''
                      })}
                      sx={{ mt: 2 }}
                    >
                      Ajouter une expérience
                    </Button>
                  </Box>
                )}
              </FieldArray>
            )}

            {activeStep === 2 && (
              <FieldArray name="education">
                {({ push, remove }) => (
                  <Box>
                    {values.education.map((_, index) => (
                      <Paper key={index} sx={{ p: 3, mb: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Typography variant="h6">Formation {index + 1}</Typography>
                          {index > 0 && (
                            <IconButton onClick={() => remove(index)} color="error">
                              <DeleteIcon />
                            </IconButton>
                          )}
                        </Box>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              name={`education.${index}.degree`}
                              label="Diplôme"
                              value={values.education[index].degree}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.education?.[index]?.degree && Boolean(errors.education?.[index]?.degree)}
                              helperText={touched.education?.[index]?.degree && errors.education?.[index]?.degree}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              name={`education.${index}.school`}
                              label="École"
                              value={values.education[index].school}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.education?.[index]?.school && Boolean(errors.education?.[index]?.school)}
                              helperText={touched.education?.[index]?.school && errors.education?.[index]?.school}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              type="date"
                              name={`education.${index}.startDate`}
                              label="Date de début"
                              value={values.education[index].startDate}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.education?.[index]?.startDate && Boolean(errors.education?.[index]?.startDate)}
                              helperText={touched.education?.[index]?.startDate && errors.education?.[index]?.startDate}
                              InputLabelProps={{ shrink: true }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              type="date"
                              name={`education.${index}.endDate`}
                              label="Date de fin"
                              value={values.education[index].endDate}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.education?.[index]?.endDate && Boolean(errors.education?.[index]?.endDate)}
                              helperText={touched.education?.[index]?.endDate && errors.education?.[index]?.endDate}
                              InputLabelProps={{ shrink: true }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              multiline
                              rows={4}
                              name={`education.${index}.description`}
                              label="Description"
                              value={values.education[index].description}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.education?.[index]?.description && Boolean(errors.education?.[index]?.description)}
                              helperText={touched.education?.[index]?.description && errors.education?.[index]?.description}
                            />
                          </Grid>
                        </Grid>
                      </Paper>
                    ))}
                    <Button
                      startIcon={<AddIcon />}
                      onClick={() => push({
                        degree: '',
                        school: '',
                        startDate: '',
                        endDate: '',
                        description: ''
                      })}
                      sx={{ mt: 2 }}
                    >
                      Ajouter une formation
                    </Button>
                  </Box>
                )}
              </FieldArray>
            )}

            {activeStep === 3 && (
              <FieldArray name="skills">
                {({ push, remove }) => (
                  <Box>
                    {values.skills.map((_, index) => (
                      <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <TextField
                          fullWidth
                          name={`skills.${index}`}
                          label={`Compétence ${index + 1}`}
                          value={values.skills[index]}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.skills?.[index] && Boolean(errors.skills?.[index])}
                          helperText={touched.skills?.[index] && errors.skills?.[index]}
                        />
                        {index > 0 && (
                          <IconButton onClick={() => remove(index)} color="error">
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </Box>
                    ))}
                    <Button
                      startIcon={<AddIcon />}
                      onClick={() => push('')}
                      sx={{ mt: 2 }}
                    >
                      Ajouter une compétence
                    </Button>
                  </Box>
                )}
              </FieldArray>
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

