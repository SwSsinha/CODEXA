const { GoogleGenAI } = require('@google/genai');
require('dotenv').config({ path: '../.env' });

// The SDK will automatically pick up the GEMINI_API_KEY from the .env file
const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);

// Export the configured client
module.exports = genAI;