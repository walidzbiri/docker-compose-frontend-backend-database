redirectIfLoggedIn();

document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementsByTagName("form")[0].addEventListener("submit",(e)=>{
        e.preventDefault();
        const email= document.getElementById("email").value;
        const password=document.getElementById("password").value;
        const user ={
            email,
            password
        }
        axios({
            method: 'post',
            url: 'http://localhost:3000/auth/signin',
            data: user,
            withCredentials:true
          })
          .then(function (response) {
            localStorage.user_id=response.data.id;
            window.location=`/user.html?id=${response.data.id}`;
          })
          .catch(function (error) {
            document.getElementById("error-message").innerText=`${error.response.data.message}`;
            document.getElementById("error-message").style.display="inline-block";
          });
    });
});

