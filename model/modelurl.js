const mongoose = require("mongoose")

const UrlSchema= new mongoose.Schema({
            
            shortId: {
                  type: String, 
                  required: true,
                  unique: true
                },
            redirectUrl:{
              type:String,
              required:true
              
            },
            visitHistory:[{
              timeStamp:{type:Number},
            }],
            createdBy:{
              type:mongoose.Schema.Types.ObjectId,
              ref:"Users"
            }
})


const URL = mongoose.model("url",UrlSchema)

module.exports=URL;