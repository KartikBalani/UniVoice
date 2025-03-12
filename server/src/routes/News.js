import express from 'express'
const router = express.Router()
import NewsData from "../models/News.js"

router.get('/',async (req , res) => {
    const category = req.query.category;

    await NewsData.find({"Category.tags" : category , "Status" : "accepted"}).sort({Date:-1})
    .then(data => {
        console.log(data);
        res.status(200).send(data);
    })
    .catch(err=>{
        res.status(404).json({"error" : "Could not find data"});
    })
})

export default router;