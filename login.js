// JavaScript Document
let loginBtn = document.getElementById("login_btn");
let loginForm = document.getElementById("loginForm");
let registerBtn = document.getElementById("registerBtn");

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
				if(details.password === credentials[i].password)
				{
					if(credentials[i].type === 'Teacher')
						location.href="./teacher.html";
					else if(credentials[i].type === 'Student')
						location.href="./student.html";
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