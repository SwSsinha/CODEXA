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

const generateTechStack = async (businessPlanText) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
  const prompt = `You are a CTO and senior software architect. Based on the following business plan, recommend a complete technology stack. The recommendation should be concise and include a frontend framework, a backend framework, and a database.

Business Plan:
${businessPlanText}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
};

const generateBounties = async (businessPlanText, techStackText) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
  const prompt = `You are a senior project manager and scrum master. Based on the following business plan and technology stack, create a list of 10-12 actionable development tasks or "bounties" to build the MVP. Each bounty should be a clear, concise task that a developer can pick up.

Business Plan:
${businessPlanText}

Technology Stack:
${techStackText}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
};

module.exports = {
  generateBusinessPlan,
  generateTechStack,
  generateBounties,
};