const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const JWT_CONFIG = {
  expiresIn: '7d',
  algorithm: 'HS256',
};
const createToken = (payload) => jwt.sign(payload, JWT_SECRET, JWT_CONFIG);
const getPayload = (token) => jwt.verify(token, JWT_SECRET);
module.exports = {
  createToken,
  getPayload,
};