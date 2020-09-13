// JavaScript Document
let loginBtn = document.getElementById("login_btn");
let loginForm = document.getElementById("loginForm");
let registerBtn = document.getElementById("registerBtn");
let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

async function postStudentData(details){
    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: details,
        redirect: 'follow'
      };
    let response = await fetch("http://localhost:5000/api/tempdetailslogin", requestOptions)
    let tempStatus = await response.json();
    return tempStatus;
}

async function getData()
{
	let response = await fetch("http://localhost:5000/api/credentials");
	let credentials = await response.json();
	return credentials;
}

loginBtn.addEventListener('click', function(e){
	e.preventDefault();
	getData()
		.then(function(credentials){
		let userFound = false;
		let details = {
		username : loginForm.elements[0].value,
		password : loginForm.elements[1].value
		};
		for(let i=0; i<credentials.length; i++){
			if(details.username === credentials[i].username)
			{
				userFound = true;
				if(details.password === credentials[i].password){
					if(credentials[i].type === 'Teacher')
						location.href="./teacher.html";
					else if(credentials[i].type === 'Student'){
						postStudentData(JSON.stringify(details)).
							then((tempStatus) => {
								if(tempStatus.success === 'true')
									location.href="./subjectSelect.html";
								else{
									alert('Login Failed! Please Try Again');
									loginForm.reset();
								}
							});
					}		
				}
				else
				{
					alert("Incorrect Password");
				}
			}
		}
		if(userFound == false)
			alert("User Not Found");
	});
});

registerBtn.addEventListener('click', function(){
	location.href="./register.html";
});