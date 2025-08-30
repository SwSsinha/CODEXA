const { GoogleGenAI } = require('@google/genai');
require('dotenv').config({ path: '../.env' });

// The SDK will automatically pick up the GEMINI_API_KEY from the .env file
const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);

const generateBusinessPlan = async (idea) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
  const prompt = `You are an expert startup strategist and market analyst. For the user's idea: '${idea}', generate a comprehensive one-page business brief. The brief must include two distinct sections: 1. A Lean Canvas Plan (with Problem, Solution, Key Metrics, etc.). 2. A Market & Competitor Analysis (identifying 2-3 potential competitors and a summary of the market landscape). Structure the entire output in clean, well-defined markdown.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
};

module.exports = {
  generateBusinessPlan,
};