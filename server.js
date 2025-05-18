const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Proxy to fetch inbox
app.get('/api/inbox', async (req, res) => {
  const { email } = req.query;

  if (!email) return res.status(400).json({ error: 'Missing email parameter' });

  try {
    const response = await axios.get(`https://tempmail.plus/api/mails?email=${email}&limit=20&epin=`);
    res.json(response.data);
  } catch (error) {
    console.error('Inbox fetch error:', error.message);
    res.status(500).json({ error: 'Failed to fetch inbox' });
  }
});

// Proxy to fetch mail details
app.get('/api/mail/:id', async (req, res) => {
  const { id } = req.params;
  const { email } = req.query;

  if (!id || !email) return res.status(400).json({ error: 'Missing id or email' });

  try {
    const response = await axios.get(`https://tempmail.plus/api/mails/${id}?email=${email}&epin=`);
    res.json(response.data);
  } catch (error) {
    console.error('Mail detail fetch error:', error.message);
    res.status(500).json({ error: 'Failed to fetch mail details' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend proxy running on http://localhost:${PORT}`);
});
