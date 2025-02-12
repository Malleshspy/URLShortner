const express= require("express")
const cookieparser=require("cookie-parser")
const {restrictToLoggedinUserOnly,checkAuth}=require("./middleware/auth")

const RouterUrl=require("./routes/routeurl")
const StaticRoute=require("./routes/StaticRouter")
const useroutes=require("./routes/user")


const{connectMongoDb}=require("./connection")
const URL=require("./model/modelurl");
const { timeStamp } = require("console");
const path=require("path")


const app = express();
const port = 8001;

connectMongoDb("mongodb://127.0.0.1:27017/short-url").then(()=>console.log("mongoDB connect"));

app.set("view engine","ejs")

app.set("views",path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieparser());



app.get("/url/:shortId",async(req,res)=>{
  const shortId=req.params.shortId;
  const entry=await URL.findOneAndUpdate({shortId},
    {
      $push:{
        visitHistory:{
          timeStamp:Date.now(),
        }
      }
    }
  );
  if (entry) {
    res.redirect(entry.redirectUrl);
  } else {
    res.status(404).send("URL not found");
  }
  
})

app.use("/url",restrictToLoggedinUserOnly,RouterUrl)
app.use("/",checkAuth,StaticRoute);
app.use("/user",useroutes);
app.use("/user/login",useroutes);


app.listen(port,()=>console.log(`server started at port: ${port}`));