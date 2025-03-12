import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
    Thumbnail : {type : String , required : true},
    Description : {type : String , required : true},
    Article : {type : String , required : true},
    Images : [
        {
            url : {type : String},
        },
    ],
    Date : {type : Date , required : true},
    Category : [
        {
            Tags : {type : String},
        },
    ],
    EditorId : {type : String , required : true},
    Status : {type : String , enum : ["accepted" , "rejected" , "pending"],default:"pending"},
  });
  

const NewsData = mongoose.model("NewsData" , NewsSchema);

export default NewsData;
