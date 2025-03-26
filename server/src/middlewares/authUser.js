import jwt from 'jsonwebtoken'; 
// import axios from 'axios';

// JWT Verification Middleware
const authenticateToken = async (req, res, next) => {
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1];
    //const token = access;
    // const refreshToken = req.cookies.refreshToken;
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token found" });
        }

    const token = authHeader.split(" ")[1]; // Extract token
    console.log("auuth:",token);

    
    // Check if token exists
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        // Verify the access token
        const decoded = jwt.verify(token, "jhgdfhjahffhafh");

        // if(decoded.roll!=="User"){
        //     return res.status(404).json({message:"You are not authorized"});1
        // }

        // Attach user information to request object
        req.user = {
            roll: decoded.roll,
            type: decoded.type
        };
        next();
        // Proceed to the next middleware or route handler
        // next();const authHeader = req.headers.authorization;
        // if (!authHeader || !authHeader.startsWith("Bearer ")) {
        //   return res.status(401).json({ message: "Unauthorized: No token found" });
        // }
      
        // const token = authHeader.split(" ")[1]; // Extract token
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Access token expired. Please refresh.' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ error: 'Invalid token' });
        }

        return res.status(500).json({ error: 'Authentication failed' });
    }
};

export default authenticateToken;