const express=require("express")
const router= express.Router();
const {handleGenerateNewShortUrl} =require("../controllers/controllerurl")

router.post("/",handleGenerateNewShortUrl);

module.exports=router;



