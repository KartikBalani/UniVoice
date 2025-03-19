import express from "express";
import NewsData, { NewsStatusLog } from "../models/News.js";

const router = express.Router();

router.patch("/update-status/:id", async (req, res) => {
  const { id } = req.params;
  const { status, rejectionReason, rejectedBy } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Missing required field: status" });
  }

  try {
    // Find and update the news article's status
    const updatedNews = await NewsData.findByIdAndUpdate(
      id,
      { Status: status },
      { new: true }
    );

    if (!updatedNews) {
      return res.status(404).json({ error: "Article not found" });
    }

    const logEntry = new NewsStatusLog({
      newsId: id,
      changedBy: rejectedBy || "admin", // Store admin ID or default to "admin"
      reason: status === "rejected" ? rejectionReason || "No reason provided" : "", // Reason is required only for rejections
      status,
      changedAt: new Date(),
    });

    await logEntry.save();

    res.status(200).json({ message: "Status updated successfully", data: updatedNews });
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ error: "Failed to update status", details: err.message });
  }
});

export default router;
