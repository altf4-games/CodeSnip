const express = require('express')
const app = express()
const { sql } = require("@vercel/postgres");

app.use(express.json({ limit: '3mb' }));
require('dotenv').config();

const get_test_data = async () => {

  const { rows } = await sql`SELECT body FROM DB WHERE id = 1;`;
  return { data: rows };
};

const set_test_data = async (data,id) => {
  //await sql`CREATE TABLE IF NOT EXISTS DB (id SERIAL PRIMARY KEY, body TEXT);`;
  await sql`INSERT INTO DB (id, body) VALUES (${id}, ${data});`;
}

app.post('/api', async (req, res) => {
  console.log(req.body);
  await set_test_data();
  res.send('OK');
})

app.get('/1', async (req, res) => {
  console.log(req.body);
  await get_test_data().then((data) => {
    console.log(data);
    res.json(data);
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server started on http://localhost:${PORT}')
})