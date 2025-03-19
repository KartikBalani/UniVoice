import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
    Thumbnail: { type: String, required: true },
    Description: { type: String, required: true },
    Article: { type: String, required: true },
    Images: [
        {
            url: { type: String },
        },
    ],
    Date: { type: Date, required: true },
    Category: [
        {
            Tags: { type: String },
        },
    ],
    EditorId: { type: String, required: true },
    Status: { type: String, enum: ["accepted", "rejected", "pending"], default: "pending" },
});

const NewsStatusLogSchema = new mongoose.Schema({
    newsId: { type: mongoose.Schema.Types.ObjectId, ref: "NewsData", required: true },
    changedBy: { type: String, required: true, default: "admin" }, // Stores admin ID or defaults to "admin"
    reason: { type: String, default: "" }, // Optional reason for accepted articles
    changedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ["accepted", "rejected"], required: true }, // Stores whether it was accepted or rejected
});

const NewsData = mongoose.model("NewsData", NewsSchema);
const NewsStatusLog = mongoose.model("NewsStatusLog", NewsStatusLogSchema, "newsStatusLog");

export { NewsStatusLog };
export default NewsData;
