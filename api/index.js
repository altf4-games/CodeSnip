const express = require('express')
const app = express()
const { sql } = require("@vercel/postgres");

app.use(express.json({ limit: '3mb' }));
require('dotenv').config();

const get_test_data = async () => {
  await sql`CREATE TABLE IF NOT EXISTS DB (id SERIAL PRIMARY KEY, body TEXT);`;
  await sql`INSERT INTO DB (body, id) VALUES ('test', 1);`;
  const { rows } = await sql`SELECT body FROM DB WHERE id = 1;`;
  return rows;
};

app.post('/api', async (req, res) => {
  console.log(req.body);
  await get_test_data().then((data) => {
    console.log(data);
  });
  res.json(data);
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server started on http://localhost:${PORT}')
})