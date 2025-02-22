const jwt=require('jsonwebtoken')
const secret="Mallesh@123";
function setUser(user){
  return jwt.sign({
    _id:user.id,
    email:user.email,
    role:user.role,

  },secret)
  
}
function getUser(token){
   if(!token) return null;
   try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return null;
  }
}
module.exports={
  setUser,
  getUser
}