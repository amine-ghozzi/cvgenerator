const JobService = require('../services/job.service');

class JobController {
  static async extractJob(req, res) {
    try {
      const { url } = req.body;

      if (!url) {
        return res.status(400).json({ message: 'URL requise' });
      }

      // Validation de l'URL
      const isValidURL = await JobService.validateJobURL(url);
      if (!isValidURL) {
        return res.status(400).json({ message: 'URL invalide ou inaccessible' });
      }

      // Extraction des données de l'offre
      const jobData = await JobService.extractJobFromURL(url);

      res.json({
        success: true,
        data: jobData
      });
    } catch (error) {
      console.error('Erreur lors de l\'extraction de l\'offre:', error);
      res.status(500).json({
        message: 'Erreur lors de l\'extraction de l\'offre d\'emploi',
        error: error.message
      });
    }
  }
}

module.exports = JobController; 