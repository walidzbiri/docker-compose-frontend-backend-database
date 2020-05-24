localStorage.removeItem('user_id')
axios({
    method: 'get',
    url: 'http://localhost:3000/auth/logout',
    withCredentials:true
  })
  .then(function (response) {
      console.log(response)
});
window.location="/"