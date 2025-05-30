const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

class OpenAIService {
  static async analyzeJobDescription(jobDescription) {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Vous êtes un expert en analyse d'offres d'emploi. Analysez l'offre et extrayez les compétences clés, les exigences et les responsabilités principales."
          },
          {
            role: "user",
            content: jobDescription
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('Erreur lors de l\'analyse de l\'offre d\'emploi:', error);
      throw error;
    }
  }

  static async adaptCV(cvContent, jobAnalysis) {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Vous êtes un expert en rédaction de CV. Adaptez le CV pour qu'il corresponde parfaitement à l'offre d'emploi, en mettant en valeur les compétences pertinentes et en reformulant les expériences pour mieux correspondre aux besoins."
          },
          {
            role: "user",
            content: `CV actuel:\n${cvContent}\n\nAnalyse de l'offre d'emploi:\n${jobAnalysis}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('Erreur lors de l\'adaptation du CV:', error);
      throw error;
    }
  }

  static async suggestTools(experience) {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Vous êtes un expert en outils et technologies. Suggérez des outils pertinents qui pourraient être utilisés dans le contexte de cette expérience professionnelle."
          },
          {
            role: "user",
            content: experience
          }
        ],
        temperature: 0.7,
        max_tokens: 300
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('Erreur lors de la suggestion d\'outils:', error);
      throw error;
    }
  }
}

module.exports = OpenAIService; 