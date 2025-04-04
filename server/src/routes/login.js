import express from 'express';
import UserData from "../models/User.js";
import argon2 from "argon2";
import {
  generateRefreshToken,
} from "../utils/token.js";

const router = express.Router();

router.post('/', async (req, res) => {
  const { Roll, password, type } = req.body;
  
  try {
    // Find user by Roll Number
    const user = await UserData.findOne({ Roll: Roll.toUpperCase() });
    
    if (!user) {
      console.log("❌ User not found");
      return res.status(404).send('User not found');
    }
    
    // Clean the stored hash (remove any trailing newlines)
    const cleanedHash = user.password.trim();
    
    // Compare entered password with cleaned stored hash
    const isMatch = await argon2.verify(cleanedHash, password);
    
    if (isMatch && type === user.type) {
      console.log("✅ Access granted");
      
      // Generate refresh token
      const refreshToken = generateRefreshToken(user);
      
  
      console.log("loginrefresh:",refreshToken);

      
      
      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge:  2 * 60 * 60 * 1000 // 2 hours
      });
      
      
      return res.json({ 
        userType: user.type, 
        roll: user.Roll,
      });
    } else {
      console.log("❌ Invalid credentials");
      return res.status(400).send('Invalid credentials');
    }
  } catch (err) {
    console.error("❌ Internal server error:", err);
    return res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

export default router;