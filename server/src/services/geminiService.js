const { GoogleGenAI } = require('@google/genai');
require('dotenv').config({ path: '../.env' });

// Correctly initialize the client.
// The SDK will automatically pick up the GEMINI_API_KEY from the .env file.
const ai = new GoogleGenAI({});

const generateBusinessPlan = async (idea) => {
  const prompt = `You are an expert startup strategist and market analyst. For the user's idea: '${idea}', generate a comprehensive one-page business brief. The brief must include two distinct sections: 1. A Lean Canvas Plan (with Problem, Solution, Key Metrics, etc.). 2. A Market & Competitor Analysis (identifying 2-3 potential competitors and a summary of the market landscape). Structure the entire output in clean, well-defined markdown.`;

  // Correct API call structure
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });
  return response.text;
};

const generateTechStack = async (businessPlanText) => {
  const prompt = `You are a CTO and senior software architect. Based on the following business plan, recommend a complete technology stack. The recommendation should be concise and include a frontend framework, a backend framework, and a database.\n\nBusiness Plan:\n${businessPlanText}`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });
  return response.text;
};

const generateBounties = async (businessPlanText, techStackText) => {
  const prompt = `You are a senior project manager and scrum master. Based on the following business plan and technology stack, create a list of 10-12 actionable development tasks or "bounties" to build the MVP. Each bounty should be a clear, concise task that a developer can pick up.\n\nBusiness Plan:\n${businessPlanText}\n\nTechnology Stack:\n${techStackText}`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });
  return response.text;
};

module.exports = {
  generateBusinessPlan,
  generateTechStack,
  generateBounties,
};