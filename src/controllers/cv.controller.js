const OpenAIService = require('../services/openai.service');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

// Configuration de multer pour le stockage des fichiers
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

class CVController {
  static async uploadCV(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'Aucun fichier n\'a été uploadé' });
      }

      let cvContent;
      const fileBuffer = req.file.buffer;
      const fileType = req.file.mimetype;

      // Extraction du contenu selon le type de fichier
      if (fileType === 'application/pdf') {
        const pdfData = await pdfParse(fileBuffer);
        cvContent = pdfData.text;
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const result = await mammoth.extractRawText({ buffer: fileBuffer });
        cvContent = result.value;
      } else {
        return res.status(400).json({ message: 'Format de fichier non supporté' });
      }

      res.json({ success: true, content: cvContent });
    } catch (error) {
      console.error('Erreur lors de l\'upload du CV:', error);
      res.status(500).json({ message: 'Erreur lors du traitement du fichier' });
    }
  }

  static async adaptCV(req, res) {
    try {
      const { cvContent, jobDescription } = req.body;

      if (!cvContent || !jobDescription) {
        return res.status(400).json({ message: 'CV et description du poste requis' });
      }

      // Analyse de l'offre d'emploi
      const jobAnalysis = await OpenAIService.analyzeJobDescription(jobDescription);

      // Adaptation du CV
      const adaptedCV = await OpenAIService.adaptCV(cvContent, jobAnalysis);

      res.json({
        success: true,
        adaptedCV,
        jobAnalysis
      });
    } catch (error) {
      console.error('Erreur lors de l\'adaptation du CV:', error);
      res.status(500).json({ message: 'Erreur lors de l\'adaptation du CV' });
    }
  }

  static async suggestTools(req, res) {
    try {
      const { experience } = req.body;

      if (!experience) {
        return res.status(400).json({ message: 'Description de l\'expérience requise' });
      }

      const suggestedTools = await OpenAIService.suggestTools(experience);

      res.json({
        success: true,
        suggestedTools
      });
    } catch (error) {
      console.error('Erreur lors de la suggestion d\'outils:', error);
      res.status(500).json({ message: 'Erreur lors de la suggestion d\'outils' });
    }
  }
}

module.exports = CVController; 