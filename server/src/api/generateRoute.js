const express = require('express');
const router = express.Router();
const { generateBusinessPlan, generateTechStack, generateBounties } = require('../services/geminiService');
const { parseBounties } = require('../utils/parser');

const history = [];

// POST /api/generate - Generate a new plan or retrieve from history
router.post('/', async (req, res) => {
  try {
    const { idea } = req.body;
    if (!idea) {
      return res.status(400).json({ error: 'Idea is required.' });
    }

    // Check if the idea exists in history
    const existingEntry = history.find(entry => entry.idea === idea);
    if (existingEntry) {
      console.log('Returning response from history for idea:', idea);
      return res.status(200).json(existingEntry.response);
    }
    
    console.log('Generating new plan for idea:', idea);
    const businessPlanText = await generateBusinessPlan(idea);
    const techStackText = await generateTechStack(idea, businessPlanText);
    const bountiesText = await generateBounties(idea, businessPlanText, techStackText);
    const bountiesJSON = parseBounties(bountiesText);

    const finalResponse = {
      businessPlan: businessPlanText,
      techStack: techStackText,
      bounties: bountiesJSON,
    };

    // Add the new entry to the history
    history.unshift({ idea, response: finalResponse }); // Add to the beginning of the array

    res.status(200).json(finalResponse);
  } catch (error) {
    console.error('Error generating plan:', error);
    res.status(500).json({ error: 'Failed to generate plan.' });
  }
});

// GET /api/history - Retrieve the list of generated ideas
router.get('/history', (req, res) => {
  // Return just the list of ideas for the history panel
  const ideaList = history.map(entry => entry.idea);
  res.status(200).json(ideaList);
});

module.exports = router;