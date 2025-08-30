const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { idea } = req.body;
    if (!idea) {
      return res.status(400).json({ error: 'Idea is required.' });
    }
    // AI logic will go here
    res.status(200).json({ message: 'Request received successfully!' });
  } catch (error) {
    console.error('Error generating plan:', error);
    res.status(500).json({ error: 'Failed to generate plan.' });
  }
});

module.exports = router;