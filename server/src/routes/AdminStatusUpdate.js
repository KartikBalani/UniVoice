// backend/routes/AdminStatusUpdate.js
import express from "express";
const router = express.Router();
import NewsData from "../models/News.js";

// Update status of a news article
router.patch("/update-status/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedNews = await NewsData.findByIdAndUpdate(
      id,
      { Status: status },
      { new: true }
    );

    if (!updatedNews) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.status(200).json({ message: "Status updated", data: updatedNews });
  } catch (err) {
    res.status(500).json({ error: "Failed to update status", details: err });
  }
});

export default router;
