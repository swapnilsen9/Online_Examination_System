let registerForm = document.getElementById('registerForm');
let registerBtn = document.getElementById('registerBtn');
let TandC = document.getElementById('T/C');

async function getData()
{
	let response = await fetch("http://localhost:5000/api/credentials");
	let credentials = await response.json();
	return credentials;
}

registerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    isUser = false;
    let formData = {
        User_ID : registerForm.elements[0].value,
        Type : registerForm.elements[1].value,
        Password : registerForm.elements[2].value,
        Confirm_Password : registerForm.elements[3].value,
        Security_Question : registerForm.elements[4].value,
        Security_Answer : registerForm.elements[5].value,
        TandC : TandC.checked
    };
    getData().
        then((credentials) => {
            for(let i=0; i<credentials.length; i++){
                if(formData.User_ID === credentials[i].username)
                    isUser = true
            }
            if(isUser === true)
                alert("Username Exists Already");
        });
});