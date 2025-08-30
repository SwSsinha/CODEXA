const { GoogleGenAI } = require('@google/genai');

// The dotenv config is removed from here. It's handled in the main index.js.
const ai = new GoogleGenAI({});

const generateBusinessPlan = async (idea) => {
  const prompt = `You are an expert startup strategist and market analyst. For the user's idea: '${idea}', generate a comprehensive one-page business brief. The brief must include two distinct sections: 1. A Lean Canvas Plan (with Problem, Solution, Key Metrics, etc.). 2. A Market & Competitor Analysis (identifying 2-3 potential competitors and a summary of the market landscape). Structure the entire output in clean, well-defined markdown.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });
  return response.text;
};

// UPDATED: Now accepts 'idea' for better context
const generateTechStack = async (idea, businessPlanText) => {
  const prompt = `You are a CTO and senior software architect. Based on the user's core idea and the following business plan, recommend a complete technology stack. The recommendation should be concise and include a frontend framework, a backend framework, and a database.\n\nCore Idea: '${idea}'\n\nBusiness Plan:\n${businessPlanText}`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });
  return response.text;
};

// UPDATED: Now accepts 'idea' for better context
const generateBounties = async (idea, businessPlanText, techStackText) => {
  const prompt = `You are a task-generation AI. Based on the provided business plan and tech stack, output a list of 10-12 actionable developer tasks for the MVP. Your entire response must be a simple list of the task titles ONLY, with each task on a new line. Do NOT include numbers, bullets, introductory paragraphs, or any other text.

Core Idea: '${idea}'
Business Plan:
${businessPlanText}
Technology Stack:
${techStackText}`;

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