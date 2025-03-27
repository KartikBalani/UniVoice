import express from 'express';
import authenticateToken from '../middlewares/autoLogin.js';
import NewsData from "../models/News.js";

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
    try {
        const category = req.query.category;
        let newsData;

        if (category) {
            newsData = await NewsData.find({
                "Category.Tags": category, 
                "Status": "accepted"
            }).sort({ Date: -1 });
        } else {
            newsData = await NewsData.find({ "Status": "accepted" }).sort({ Date: -1 });
        }

        const responseData = {
            newsData: newsData,
            User: { 
                roll: req.user.roll || null, 
                type: req.user.type || "user"
            } 
        };

        res.status(200).json(responseData);
    } catch (err) {
        console.error(err);
        res.status(404).json({ "error": "Could not find data" });
    }
});

export default router;