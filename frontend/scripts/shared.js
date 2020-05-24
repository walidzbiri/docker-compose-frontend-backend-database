const redirectIfLoggedIn=()=>{
  if(localStorage.user_id){
      window.location=`/user.html?id=${localStorage.user_id}`;
    }
}