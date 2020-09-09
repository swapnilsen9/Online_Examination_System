// JavaScript Document
let loginBtn = document.getElementById("login_btn");
let loginForm = document.getElementById("loginForm");
let registerBtn = document.getElementById("registerBtn");

async function getData()
{
	let response = await fetch("./credentials.json");
	let credentials = await response.json();
	return credentials;
}

loginBtn.addEventListener('click', function(e){
	e.preventDefault();
	getData()
		.then(function(credentials){
		let details = {
		"username" : loginForm.elements[0].value,
		"password" : loginForm.elements[1].value
		};
		if(details.username === credentials.username)
		{
			if(details.password === credentials.password)
			{
				alert("Authentication Successful");
			}
			else
			{
				alert("Incorrect Password");
			}
		}
		else
		{
			alert("Incorrect Username");
		}
	});
});

registerBtn.addEventListener('click', function(){
	location.href="/register.html";
});