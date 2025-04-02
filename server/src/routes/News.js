import express from 'express'
const router = express.Router()
import NewsData,{NewsStatusLog} from "../models/News.js"

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
    const { editorId } = req.query;

    if (!editorId) {
        return res.status(400).json({ error: "Editor ID is required" });
    }

    try {
        const userNews = await NewsData.find({ EditorId: editorId }).sort({ Date: -1 }).lean(); // ✅ Use .lean()

        if (userNews.length === 0) {
            return res.status(404).json({ message: "No news found for this user" });
        }

        // Fetch all status logs in parallel
        const statusLogs = await Promise.all(
            userNews.map(newsItem =>
                NewsStatusLog.findOne({ newsId: newsItem._id })
                    .sort({ changedAt: -1 })
                    .lean()
            )
        );

        // Attach status logs
        userNews.forEach((newsItem, index) => {
            if (statusLogs[index]) {
                newsItem.latestStatus = statusLogs[index]; // ✅ No `_doc` issue
            }
        });

        res.status(200).json(userNews);
    } catch (error) {
        console.error("🔥 Error fetching user news:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



export default router;