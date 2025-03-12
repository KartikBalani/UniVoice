import express from 'express';
const router = express.Router();
import UserData from "../models/User.js";
import bcrypt from "bcrypt";

router.post('/', async (req, res) => {
    const { Roll, password, type } = req.body;
    console.log({ Roll: Roll, password: password, type: type });

    try {
        // Find user by Roll Number (ensuring uppercase matching)
        const user = await UserData.findOne({ Roll: Roll.toUpperCase() });

        if (!user) {
            console.log("❌ User not found");
            return res.status(404).send('User not found');
        }

        console.log({ pass: user.password, type: user.type });

        // Compare hashed password with entered password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", isMatch);

        if (isMatch && type === user.type) {
            console.log("✅ Access granted");
            return res.json({ access: 'granted' });
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