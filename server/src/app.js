import express from "express"
import helmet from "helmet"
import bodyParser from "body-parser"
import cors from "cors"
import mongoose from "mongoose"
import login from "./routes/login.js"
import News from "./routes/News.js"
import AdminNews from "./routes/AdminNews.js"
import dotenv from "dotenv"
import PostNews from "./routes/postNews.js"

const app = express()
const port = 3000

app.use(bodyParser.urlencoded( {extended : true} ));
app.use(helmet())
app.use(cors())
app.use(express.json())

dotenv.config();
const murl = process.env.Mongo_URI;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(murl);
  console.log("Connected successfully");
}

app.use('/login',login)
app.use('/',News);
app.use('/admin',AdminNews);
app.use('/postNews',PostNews);

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})