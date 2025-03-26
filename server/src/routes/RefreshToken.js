import express from 'express';
//import router from './login';
import jwt from 'jsonwebtoken';
import {generateAccessToken,verifyAccessToken} from '../utils/token.js';
import router from './login.js';
import { authenticateToken } from '../middlewares/auth.js';

router = express.Router();


router.post('/refresh-token', async (req, res) => {

    //const {accessToken,Roll,type} = req.body;
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) return res.status(401).json({ message: "User not authenticated" });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }
        // Extract user role and type from the decoded token
        const { userRole, userType } = decoded;

        const accessToken = generateAccessToken(userRole,userType);
    
        res.json({accessToken});
    });
    

    // jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err) => {
    //     jwt.decode


    //     if (err) return res.status(403).json({ message: "Invalid token" });
    //     if(verifyAccessToken(accessToken) === null){
    //         const accessToken = generateAccessToken(Roll,type)
    //     }
    //     res.json({accessToken});
    // });
});


export default router;