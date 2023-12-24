const express = require('express')
const app = express()
import { sql } from "@vercel/postgres";

app.use(express.json({ limit: '3mb' }));
require('dotenv').config();

const get_test_data = async () => {
  await sql`CREATE TABLE DB (id INT PRIMARY KEY,body TEXT);`;
  const { rows } = await sql`SELECT body FROM DB WHERE id = 0;`;
  return rows;
};

app.post('/api', async (req, res) => {
  console.log(req.body);
  res.status(200).send('Received the data.');
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server started on http://localhost:${PORT}')
})