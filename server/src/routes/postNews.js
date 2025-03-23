import express from "express";
import multer from "multer";
import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";
import NewsData from "../models/News.js";

dotenv.config();

const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

const router = express.Router();

const Storage = multer.memoryStorage();
const upload = multer({storage:Storage});

// Configuration
cloudinary.config({ 
    cloud_name: 'dlwdhadk2', 
    api_key: apiKey, 
    api_secret: apiSecret // Click 'View API Keys' above to copy your API secret
});

async function uploadFiles(fileBuffer,type) {
    // Upload an image
    return new Promise((resolve,reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "images",
                public_id: `${type}_${Date.now()}`, 
            },
            (error, result) => {
                if (error) {
                    console.error("Upload error:", error);
                    reject(error); 
                } else {
                    console.log("Upload successful:", result.secure_url);
                    resolve(result.secure_url);
                }
            });
     
            uploadStream.end(fileBuffer);
    })     
};

// Handle form submission with file uploads
router.post("/", upload.fields([{ name: "thumbnail" }, { name: "images" }]), async (req, res) => {
    try {
        const description = req.body.Description;
        const article = req.body.article;
        const roll = req.body.userRoll;
        const categories = JSON.parse(req.body.categories || "[]").map((tag) => ({
            Tags: tag,
        }));

        const thumbnail = req.files["thumbnail"] ? req.files["thumbnail"][0] : null;
        const images = req.files["images"] || [];

        let thumbnailUrl = "";
        let imageUrls = [];

        // Upload thumbnail and get the URL
        if (thumbnail) {
            thumbnailUrl = await uploadFiles(thumbnail.buffer, "thumbnail");
        }

        // Upload images and collect URLs
        if (images.length > 0) {
            imageUrls = await Promise.all(
                images.map((item) => uploadFiles(item.buffer, "images"))
            );
        }

        console.log("Description:", description);
        console.log("Article:", article);
        console.log("Categories:", categories);
        console.log("Thumbnail URL:", thumbnailUrl);
        console.log("Image URLs:", imageUrls);

        await NewsData.create({
            Description: description,
            Article: article,
            Category: categories,
            Thumbnail: thumbnailUrl,
            images: imageUrls,
            Date: Date.now(),
            EditorId: roll,
        }).catch((err) => {
            console.error("Error while saving data:", err);
        });
        

        // Example: Send URLs back to the client or store in DB
        res.status(200).json({
            message: "Files uploaded successfully",
            thumbnailUrl,
            imageUrls,
        });
    } catch (error) {
        console.error("Error during file upload:", error);
        res.status(500).send("Error uploading files");
    }
});

export default router;
