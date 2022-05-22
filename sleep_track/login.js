let form=document.getElementById("loginSubmission");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    submit();
  })
  
  const submit=()=>{
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    if(username =='admin' && password =='admin'){
        console.log(username,password)
        alert('User Logged in Successfully!!')
        window.location.href = "index.html";
    }
    else if(username =='' || password ==''){
        alert('Please Enter the data!!')
    }
    else {
        alert('Invalid User!! Please try again.')
    }
  }