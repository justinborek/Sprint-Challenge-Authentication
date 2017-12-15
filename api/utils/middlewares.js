const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/userModels');
const { mysecret } = require('../../config');
const SaltRounds = 11;

const authenticate = (req, res, next) => {
  const token = req.get('Authorization');
  if (token) {
    jwt.verify(token, mysecret, (err, decoded) => {
      if (err) return res.status(422).json(err);
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).json({
      error: 'No token provided, must be set on the Authorization Header'
    });
  }
};

const encryptUserPW = (req, res, next) => {
  const { username, password } = req.body;
  if (!password) {
    throw new Error();
    return;
  }
  bcrypt  
    .hash(password, SaltRounds)
    .then((pass) => {
      req.user = { username: username, password: pass };
      next();
    })
    .catch((err) => {
      throw new Error(err);
    })
};

const compareUserPW = (req, res, next) => {
  const { username, password } = req.body;
  if (!username) {
    throw new Error('No username passed to compareUserPW middleware');
    return;
  }
  User.findOne ({ username }, (err, user) => {
    if (err || user === null) {
      throw new Error('No found user in compareUserPW middleware');
      return;
    }
    const hashedPass = user.password;
    bcrypt
      .compare(password, hashedPass)
      .then((response) => {
        if (!response) throw new Error('No response in compareUserPW middleware');
        req.username = user.username;
        next();
      })
      .catch((error) => {
        throw new Error();
        return;
      })
  })
};

module.exports = {
  authenticate,
  encryptUserPW,
  compareUserPW
};
