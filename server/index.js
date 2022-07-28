require('dotenv/config');
const path = require('path');
const pg = require('pg');
const express = require('express');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
const publicPath = path.join(__dirname, 'public');

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(require('./dev-middleware')(publicPath));
} else {
  app.use(express.static(publicPath));
}

app.get('/api/waitlist', (req, res, next) => {
  const sql = `
    select *
      from "posts"
  `;
  db.query(sql)
    .then(result => {
      const waitlist = result.rows;
      res.json(waitlist);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.post('/api/waitlist', (req, res, next) => {
  const { name, phoneNumber, barberName } = req.body;
  if (!name || !phoneNumber || !barberName) {
    throw new ClientError(400, 'name, phone number, and barber name are required');
  }
  const sql = `
    insert into "posts" ("name", "phoneNumber", "barberName")
    values ($1, $2, $3)
    returning *
  `;
  const params = [name, phoneNumber, barberName];
  db.query(sql, params)
    .then(result => {
      const [waitlistEntry] = result.rows;
      res.status(201).json(waitlistEntry);
    })
    .catch(err => next(err));

});

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
