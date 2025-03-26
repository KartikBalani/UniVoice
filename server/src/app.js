import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from 'cookie-parser'
import mongoose from "mongoose";
import login from "./routes/login.js";
import News from "./routes/News.js";
import AdminNews from "./routes/AdminNews.js";
import PostNews from "./routes/postNews.js";
import AdminStatusUpdate from "./routes/AdminStatusUpdate.js"; // ✅ NEW IMPORT
import dotenv from "dotenv";
import ViewNews from "./routes/viewNews.js";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:5173', // ✅ Ensure frontend URL matches exactly
  credentials: true,  // ✅ Allows cookies to be sent
  // methods: ['GET', 'POST', 'PUT', 'DELETE'], // Optional: Ensure all methods are allowed
  // allowedHeaders: ['Content-Type', 'Authorization'], // Optional: Explicitly allow headers
}));
app.use(express.json());
app.use(cookieParser())
dotenv.config();
const murl = process.env.Mongo_URI;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(murl);
  console.log("Connected successfully");
}

// ✅ ROUTES
app.use("/login", login);
app.use("/", News);
app.use("/admin", AdminNews);
app.use("/admin", AdminStatusUpdate);  // ✅ REGISTER THE NEW STATUS UPDATE ROUTE
app.use("/postNews", PostNews);
app.use("/viewNews",ViewNews);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
