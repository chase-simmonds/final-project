require('dotenv/config');
const path = require('path');
const pg = require('pg');
const express = require('express');
const errorMiddleware = require('./error-middleware');

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

app.patch('/api/waitlist/:postId', (req, res) => {
  const postId = Number(req.params.postId);
  if (!Number.isInteger(postId) || postId < 1) {
    res.status(400).json({
      error: 'postId must be a positive integer'
    });
    return;
  }
  const { isCompleted } = req.body;
  if (typeof isCompleted !== 'boolean') {
    res.status(400).json({
      error: 'isCompleted (boolean) is a required field'
    });
    return;
  }
  const sql = `
    update "posts"
       set "isCompleted" = $1
     where "postId" = $2
     returning *
  `;
  const params = [isCompleted, postId];
  db.query(sql, params)
    .then(result => {
      const [waitlistEntry] = result.rows;
      if (!waitlistEntry) {
        res.status(404).json({
          error: `cannot find todo with todoId ${postId}`
        });
        return;
      }
      res.json(waitlistEntry);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
