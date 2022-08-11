require('dotenv/config');
const path = require('path');
const pg = require('pg');
const argon2 = require('argon2');
const express = require('express');
const jwt = require('jsonwebtoken');
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

app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "barber" ("username", "hashedPassword")
        values ($1, $2)
        returning "barberId", "username"
      `;
      const params = [username, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "barberId",
           "hashedPassword"
      from "barber"
      where "username" = $1
  `;

  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid user login');
      }
      const { barberId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid hashed login');
          }
          const payload = { barberId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
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

app.delete('/api/waitlist/:postId', (req, res) => {
  const postId = Number(req.params.postId);
  if (!Number.isInteger(postId) || postId <= 0) {
    res.status(400).json({ error: 'Client ID must be a positive number' });
  }
  const sql = `
  delete from "posts"
  where "postId" = $1
  returning *
  `;

  const params = [postId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        res.status(404).json({ error: `Record at ${postId} does not exist` });
      } else {
        res.status(204).send();
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'An unexpected error occurred' });
    });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
