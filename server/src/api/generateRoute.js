const express = require('express');
const router = express.Router();
const { generateBusinessPlan, generateTechStack } = require('../services/geminiService');

router.post('/', async (req, res) => {
  try {
    const { idea } = req.body;
    if (!idea) {
      return res.status(400).json({ error: 'Idea is required.' });
    }
    const businessPlanText = await generateBusinessPlan(idea);
    const techStackText = await generateTechStack(businessPlanText);
    res.status(200).json({
      businessPlan: businessPlanText,
      techStack: techStackText
    });
  } catch (error) {
    console.error('Error generating plan:', error);
    res.status(500).json({ error: 'Failed to generate plan.' });
  }
});

module.exports = router;