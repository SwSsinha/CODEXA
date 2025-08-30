const express = require('express');
const router = express.Router();
const { generateBusinessPlan, generateTechStack, generateBounties } = require('../services/geminiService');
const { parseBounties } = require('../utils/parser');

router.post('/', async (req, res) => {
  try {
    const { idea } = req.body;
    if (!idea) {
      return res.status(400).json({ error: 'Idea is required.' });
    }
    const businessPlanText = await generateBusinessPlan(idea);
    const techStackText = await generateTechStack(businessPlanText);
    const bountiesText = await generateBounties(businessPlanText, techStackText);
    const bountiesJSON = parseBounties(bountiesText);

    const finalResponse = {
      businessPlan: businessPlanText,
      techStack: techStackText,
      bounties: bountiesJSON,
    };

    res.status(200).json(finalResponse);
  } catch (error) {
    console.error('Error generating plan:', error);
    res.status(500).json({ error: 'Failed to generate plan.' });
  }
});

module.exports = router;