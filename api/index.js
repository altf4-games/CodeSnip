const express = require('express')
const app = express()
const { sql } = require("@vercel/postgres");
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(express.static('public'));
require('dotenv').config();

app.post('/send', async (req, res) => {
  //console.log(req.body);
  await set_test_data(req.body.id, req.body.body);
  res.json({ status: 'ok' });
})

app.get(`/raw/:id`, async (req, res) => {
  const id = req.params.id;
  const data = await get_test_data(id);
  //console.log(data);
  res.send(data.rows[0].body);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`)
})

const get_test_data = async (id) => {
  const { rows } = await sql`SELECT body FROM DB WHERE id = ${id};`;
  return { rows };
};

const set_test_data = async (id,data) => {
  await sql`CREATE TABLE IF NOT EXISTS DB (id SERIAL PRIMARY KEY, body TEXT);`;
  await sql`INSERT INTO DB (id, body) VALUES (${id}, ${data});`;
}