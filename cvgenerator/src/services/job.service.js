const axios = require('axios');
const cheerio = require('cheerio');

class JobService {
  static async extractJobFromURL(url) {
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      // Sélecteurs communs pour les offres d'emploi
      const selectors = {
        title: [
          'h1.job-title',
          'h1.title',
          '.job-header h1',
          'h1[itemprop="title"]'
        ],
        description: [
          '.job-description',
          '.description',
          '[itemprop="description"]',
          '.job-details'
        ],
        company: [
          '.company-name',
          '[itemprop="hiringOrganization"]',
          '.employer-name'
        ],
        location: [
          '.job-location',
          '[itemprop="jobLocation"]',
          '.location'
        ]
      };

      // Fonction pour trouver le premier élément correspondant à un sélecteur
      const findFirstMatch = (selectors) => {
        for (const selector of selectors) {
          const element = $(selector);
          if (element.length > 0) {
            return element.text().trim();
          }
        }
        return null;
      };

      // Extraction des informations
      const jobData = {
        title: findFirstMatch(selectors.title),
        description: findFirstMatch(selectors.description),
        company: findFirstMatch(selectors.company),
        location: findFirstMatch(selectors.location),
        url: url
      };

      // Si aucune description n'est trouvée, essayer d'extraire le texte principal
      if (!jobData.description) {
        const mainContent = $('main, article, .content, #content');
        if (mainContent.length > 0) {
          jobData.description = mainContent.text().trim();
        }
      }

      // Vérification des données extraites
      if (!jobData.description) {
        throw new Error('Impossible d\'extraire la description du poste');
      }

      return jobData;
    } catch (error) {
      console.error('Erreur lors de l\'extraction de l\'offre d\'emploi:', error);
      throw error;
    }
  }

  static async validateJobURL(url) {
    try {
      const response = await axios.head(url);
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }
}

module.exports = JobService; 