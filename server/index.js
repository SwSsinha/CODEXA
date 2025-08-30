const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/generate', (req, res) => {
  console.log('Idea:', req.body.idea);
  res.status(200).json({ message: 'Request received successfully!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});