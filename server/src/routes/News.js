import express from 'express'
const router = express.Router()
import NewsData from "../models/News.js"

router.get('/',async (req , res) => {
    const category = req.query.category;
    console.log(category);
    
    if(category){
    await NewsData.find({"Category.Tags" : category , "Status" : "accepted"}).sort({Date:-1})
    .then(data => {
        console.log(data);
        res.status(200).send(data);
    })
    .catch(err=>{
        res.status(404).json({"error" : "Could not find data"});
    })
    }
    else{
        await NewsData.find({"Status":"accepted"}).sort({Date:-1})
        .then(data => {
            console.log(data);
            res.status(200).send(data);
        })
        .catch(err=>{
            res.status(404).json({"error" : "Could not find data"});
        })
    }
});

router.get('/user-news', async (req, res) => {
    const { editorId } = req.query; // Match frontend query parameter

    if (!editorId) {
        return res.status(400).json({ error: "Editor ID is required" });
    }

    try {
        const userNews = await NewsData.find({ EditorId: editorId }).sort({ Date: -1 });

        if (userNews.length === 0) {
            return res.status(404).json({ message: "No news found for this user" });
        }

        res.status(200).json(userNews);
    } catch (error) {
        console.error("Error fetching user news:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


export default router;