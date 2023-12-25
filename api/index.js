const express = require('express')
const app = express()
const { sql } = require("@vercel/postgres");
const cors = require('cors');

app.use(express.json({ limit: '3mb' }));
app.use(cors());
require('dotenv').config();

const get_test_data = async (id) => {
  const { rows } = await sql`SELECT body FROM DB WHERE id = ${id};`;
  return { data: rows };
};

const set_test_data = async (id,data) => {
  await sql`CREATE TABLE IF NOT EXISTS DB (id SERIAL PRIMARY KEY, body TEXT);`;
  await sql`INSERT INTO DB (id, body) VALUES (${id}, ${data});`;
}

app.post('/api', async (req, res) => {
  console.log(req.body);
  await set_test_data();
  res.json({ status: 'ok' });
})

app.get(`/raw/:id`, async (req, res) => {
  const id = req.params.id;
  const data = await get_test_data(id);
  console.log(data);
  res.json(data);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server started on http://localhost:${PORT}')
})
