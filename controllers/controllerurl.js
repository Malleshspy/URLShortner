const URL=require("../model/modelurl")
const shortid = require('shortid');



async function handleGenerateNewShortUrl(req,res){
  const body=req.body;
  if(!body.url)
    return res.status(400).json({error:"url is required"})
  const shortID= shortid();
  await URL.create({
    shortId:shortID,
    redirectUrl:body.url,
    visitHistory:[],
    createdBy:req.user._id,
  })

  return res.render("home",{
    id:shortID,
  })
}

module.exports={
  handleGenerateNewShortUrl,
}

