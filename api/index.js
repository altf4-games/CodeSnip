const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config();

app.use(express.json({ limit: '3mb' }));
app.use(cors());

app.post('/api', (req, res) => {
  console.log(req.body);
  res.status(200).send('Received the data.');
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server started on http://localhost:${PORT}')
})