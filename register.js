let registerForm = document.getElementById('registerForm');
let registerBtn = document.getElementById('registerBtn');
let TandC = document.getElementById('T/C');

let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

async function postData(details){
    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: details,
        redirect: 'follow'
      };
    let response = await fetch("http://localhost:5000/api/credentials", requestOptions)
    let credStatus = await response.json();
    return credStatus;
}

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
    if(!formData.User_ID || !formData.Password || !formData.Confirm_Password || !formData.Security_Answer){
        alert("All Fields Must Be Filled!");
    }
    else{
        getData().
        then((credentials) => {
            for(let i=0; i<credentials.length; i++){
                if(formData.User_ID === credentials[i].username)
                    isUser = true
            }
            if(isUser === true)
                alert("Username Exists Already");
            else{
                if(formData.Password === formData.Confirm_Password){
                    if(formData.TandC === true){
                        let credentialData = {
                            username : registerForm.elements[0].value,
                            type : registerForm.elements[1].value,
                            password : registerForm.elements[2].value,
                            security_question : registerForm.elements[4].value,
                            security_answer : registerForm.elements[5].value,
                        }
                        postData(JSON.stringify(credentialData)).
                            then((regStatus) => {
                                if(regStatus.success === 'true'){
                                    alert("Registration Successful!");
                                    location.href="./login.html";
                                }
                                else{
                                    alert("Registration Failed! Please Try Again");
                                }
                            });
                    }
                    else{
                        alert('Terms & Conditions Not Agreed!');
                    }
                }
                else{
                    alert('Passwords Don\'t Match!');
                }
            };
        });
    }
});