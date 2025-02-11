const{handleuserSignup,handleuserLogin}=require("../controllers/user")
const express=require("express")
const router=express.Router()
router.post("/",handleuserSignup)
router.post("/login",handleuserLogin)

module.exports=router;