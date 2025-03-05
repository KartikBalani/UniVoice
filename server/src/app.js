import express from "express"
import helmet from "helmet"
import bodyParser from "body-parser"
import cors from "cors"
import mongoose from "mongoose"
import login from "./routes/login.js"
import News from "./routes/News.js"
import AdminNews from "./routes/AdminNews.js"



const app = express()
const port = 3000

app.use(bodyParser.urlencoded( {extended : true} ));
app.use(helmet())
app.use(cors())
app.use(express.json())


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/UniVoice');
}

app.use('/login',login)
app.use('/',News);
app.use('/admin',AdminNews);

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})