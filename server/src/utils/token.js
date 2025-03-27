import jwt from 'jsonwebtoken';
// require('dotenv').config();
import 'dotenv/config';
//import express from 'express';
//import router from './login';
//import jwt from 'jsonwebtoken';
//import {generateAccessToken,verifyAccessToken} from '../utils/token.js';
//import router from './login.js';

// Use environment variables in production!
const ACCESS_TOKEN_SECRET = process.env.ACCESS_KEY;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_KEY;

// Generate Access Token (Short-lived, e.g., 15m)
export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      roll: user.Roll,
      type: user.type
    },
    ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      roll: user.Roll,
      type: user.type
    },
    REFRESH_TOKEN_SECRET,
    { expiresIn: '120m' }
  );
};

export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (error) {
    return null;
  }
};

// Verify Refresh Token
export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
  } catch (error) {
    return null;
  }
};

export default generateAccessToken;