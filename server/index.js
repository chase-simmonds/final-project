require('dotenv/config');
const path = require('path');
const pg = require('pg');
// const argon2 = require('argon2');
const express = require('express');
// const jwt = require('jsonwebtoken');
// const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
// const authorizationMiddleware = require('./authorization-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
//
const app = express();
const publicPath = path.join(__dirname, 'public');

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(require('./dev-middleware')(publicPath));
} else {
  app.use(express.static(publicPath));
}

app.get('/api/waitlist', (req, res) => {
  const sql = `
    select *
      from "posts"
     order by "postId"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.use(errorMiddleware);

app.post('/api/waitlist', (req, res) => {
  const { name, phoneNumber, barberName } = req.body;
  if (!name || !phoneNumber || !barberName) {
    res.status(400).json({
      error: 'name, phone number, and barber are required fields'
    });
    return;
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
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

// app.use(authorizationMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
