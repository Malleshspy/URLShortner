const User=require("../model/usermodel")
const{setUser}=require ("../services/auth")

async function handleuserSignup(req,res){
  const {name,email,password}=req.body;
  console.log(name,email,password)
  await User.create({
    name,
    email,
    password,
    
});
return res.redirect("/");
}
async function handleuserLogin(req,res){
  const {email,password}=req.body;
  const user=await User.findOne({email,password});
  if(!user){
    return res.render("login",{
      error:"invalid email/password",

    });
  }
  
const token=setUser(user);
res.cookie("token",token); 
return res.redirect("/")
}
module.exports={
  handleuserSignup,
  handleuserLogin
}