const express = require('express')
const app = express()
const { sql } = require("@vercel/postgres");
const cors = require('cors');

app.use(express.json({limit: '1mb'}));
app.use(cors());
app.use(express.static('public'));
require('dotenv').config();

app.post('/send', async (req, res) => {
  await set_test_data(req.body.id, req.body.body);
  res.json({ status: 'ok' });
})

app.get(`/raw/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    const data = await get_test_data(id);
    if (!data || !data.rows || data.rows.length === 0) {
      res.status(404).send("Data not found");
      return;
    }
    res.type('text/plain');
    res.send(data.rows[0].body);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port:${PORT}`)
})

const get_test_data = async (id) => {
  const { rows } = await sql`SELECT body FROM DB WHERE id = ${id};`;
  return { rows };
};

const set_test_data = async (id,data) => {
  await sql`CREATE TABLE IF NOT EXISTS DB (id SERIAL PRIMARY KEY, body TEXT);`;
  await sql`INSERT INTO DB (id, body) VALUES (${id}, ${data});`;
}