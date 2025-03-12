import express from "express";
import multer from "multer";

const router = express.Router();

const Storage = multer.memoryStorage();
const upload = multer({storage:Storage});

// Handle form submission with file uploads
router.post('/',upload.fields([{name : "thumbnail"},{name:"images"}]),(req,res) => {
    const description = req.body.Description;
    const article = req.body.article;
    const categories = JSON.parse(req.body.categories);
    const thumbnail = req.files["thumbnail"];
    const images = req.files["images"];

    console.log(description);
    console.log(article);
    console.log(categories);
    console.log(thumbnail);
    console.log(images);

    res.sendStatus(200);
})
export default router;
