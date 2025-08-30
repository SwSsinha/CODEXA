const express = require('express');
const router = express.Router();
const { generateBusinessPlan, generateTechStack, generateBounties } = require('../services/geminiService');
const { parseBounties } = require('../utils/parser');

let cachedIdea = '';
let cachedResponse = null;

router.post('/', async (req, res) => {
  try {
    const { idea } = req.body;
    if (!idea) {
      return res.status(400).json({ error: 'Idea is required.' });
    }

    // If the idea is the same as the cached one, return the cached response
    if (idea === cachedIdea && cachedResponse) {
      console.log('Returning cached response for idea:', idea);
      return res.status(200).json(cachedResponse);
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

    // Cache the new idea and its response
    cachedIdea = idea;
    cachedResponse = finalResponse;

    res.status(200).json(finalResponse);
  } catch (error) {
    console.error('Error generating plan:', error);
    // Clear cache on error
    cachedIdea = '';
    cachedResponse = null;
    res.status(500).json({ error: 'Failed to generate plan.' });
  }
});

module.exports = router;