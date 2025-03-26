import jwt from 'jsonwebtoken';
import { generateAccessToken } from '../utils/token.js';

const authenticateToken = async (req, res, next) => {
  try {
    // First, check the refresh token
    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken) {
      return res.status(401).json({ message: 'Unauthorized: No refresh token provided' });
    }

    // Verify refresh token
    let decodedRefreshToken;
    try {
      decodedRefreshToken = jwt.verify(refreshToken, "your-refresh-secret-key");
    } catch (refreshError) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Check the access token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No access token found" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Verify the access token
    let decoded;
    try {
      decoded = jwt.verify(token, "jhgdfhjahffhafh");
    } catch (error) {
      // Handle different types of token errors
      if (error.name === 'TokenExpiredError') {
        // Generate new access token using information from refresh token
        const { userRole, userType } = decodedRefreshToken;
        const accessToken = generateAccessToken(userRole, userType);
        return res.json({ accessToken });
      }

      if (error.name === 'JsonWebTokenError') {
        return res.status(403).json({ error: 'Invalid token' });
      }

      // Catch-all for other token verification errors
      return res.status(500).json({ error: 'Authentication failed' });
    }

    // Check if user is an admin
    if (decoded.type !== "Admin") {
      return res.status(403).json({ message: "You are not authorized" });
    }

    // Attach user information to request object
    req.user = {
      roll: decoded.roll,
      type: decoded.type
    };

    next();
  } catch (error) {
    // Catch any unexpected errors
    console.error('Authentication middleware error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default authenticateToken;