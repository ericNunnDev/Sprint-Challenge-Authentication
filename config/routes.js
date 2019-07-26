const router = require('express').Router();
const axios = require('axios');
const bcrypt = require('bcryptjs');
const db = require('./model');
const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

router.get('/jokes', authenticate, (req, res) => {

});

function register(req, res) {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  db.add(user)
  .then(saved => {
    res.status(200).json(saved);
  })
  .catch(e => res.status(500).json(e));
}

function login (req, res) {
  let { username, password} = req.body;

  db.findBy({ username })
  .first()
  .then(user => {
    if(user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({ message: `Welcome ${user.username}!` });
    } else {
      res.status(401).json({ message: 'Invalid username or password.' })
    }
  })
  .catch(e => res.status(500).json(e));
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
