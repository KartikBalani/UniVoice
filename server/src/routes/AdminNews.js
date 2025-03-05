import express from 'express'
const router = express.Router()
import NewsData from "../models/News.js"

router.get('/',async (req , res) => {
    const status = req.query.status;
    console.log(status);

    await NewsData.find({"Status" : status , "EditorId" : "editor200"}).sort({Date:-1})
    .then(data => {
        console.log(data);
        res.status(200).send(data);
    })
    .catch(err=>{
        res.status(404).json({"error" : "Could not find data"});
    })
})

export default router