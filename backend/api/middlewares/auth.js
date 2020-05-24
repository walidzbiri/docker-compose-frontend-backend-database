const isLoggedIn = (req, res, next) => {
  console.log(req.cookies)
  if(req.cookies.user_id){
    next();
  }else{
    res.status(401).json({message:"You re not logged in"});
  }
}

const isAuthorized =(req, res, next)=>{
  if(req.cookies.user_id==req.params.id){
    next();
  }else{
    res.status(401).json({message:"You re not authorized"});
  }
}

module.exports = {isLoggedIn,isAuthorized};
