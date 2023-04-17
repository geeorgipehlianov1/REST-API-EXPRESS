const sha256 = require('sha256');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'amskdnjaksdla';
const blacklist = [];

async function register(email, password) {
  const existing = await User.findOne({ email: new RegExp(`^${email}$`) });

  if (existing) {
    throw new Error('Email already exists');
  }

  const user = new User({
    email: email,
    hashedPassword: await sha256(password, 10),
  });

  user.save();

  return createSession(user);
}

async function login(email, password) {
  const existing = await User.findOne({ email: new RegExp(`^${email}$`) });

  if (!existing) {
    throw new Error('Incorect username or password');
  }

  const match = sha256(password) === existing.hashedPassword;

  if (!match) {
    throw new Error('Incorect username or password');
  }
  return createSession(existing);
}

function logout(token) {
  blacklist.push(token);
}

function createSession(user) {
  return {
    email: user.email,
    _id: user._id,
    accessToken: jwt.sign(
      {
        email: user.email,
        _id: user._id,
      },
      JWT_SECRET
    ),
  };
}

function verifySession(token) {
  if (blacklist.includes(token)) {
    throw new Error('Token is invalidated');
  }

  const payload = jwt.verify(token, JWT_SECRET);

  return {
    email: payload.email,
    _id: payload._id,
    token,
  };
}

module.exports = {
  register,
  login,
  logout,
  verifySession,
};
