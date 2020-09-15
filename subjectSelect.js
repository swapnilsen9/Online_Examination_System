let subjectBtn = document.getElementById('subjectBtn');
let subjectForm = document.getElementById('subjectForm');
let logoutBtn = document.getElementById('logoutBtn');
let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

async function postTempData(details){
    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: details,
        redirect: 'follow'
      };
    let response = await fetch("http://localhost:5000/api/tempdetailssubject", requestOptions)
    let tempStatus = await response.json();
    return tempStatus;
}

async function getData()
{
	let response = await fetch("http://localhost:5000/api/tempdetails");
	let tempDetails = await response.json();
	return tempDetails;
}

async function getResult()
{
	let response = await fetch("http://localhost:5000/api/result");
	let resultDetails = await response.json();
	return resultDetails;
}

async function getQuestions()
{
	let response = await fetch("http://localhost:5000/api/questions");
	let questions = await response.json();
	return questions;
}

logoutBtn.addEventListener('click', () => location.href = './login.html');

subjectBtn.addEventListener('click', (e) => {
    e.preventDefault();
    getQuestions().
        then((questions) => {
            let quesExists = false;
            let len = questions.length;
            for(let i=0; i<len; i++){
                if(subjectForm.elements[0].value === questions[i].subject){
                    quesExists = true;
                    break;
                }
            }
            if(quesExists === true){    
                let exists = false;
                getData().
                    then((tempDetails) => {
                        getResult().
                            then((resultDetails) => {
                                let len = resultDetails.length;
                                for(let i=0; i<len; i++){
                                    if(resultDetails[i].username === tempDetails.username){
                                        if(resultDetails[i].subject === subjectForm.elements[0].value){
                                            exists = true;
                                            break;
                                        }
                                    }
                                }
                                if(exists === false){
                                let details = {
                                    username : tempDetails.username,
                                    password : tempDetails.password,
                                    subject : subjectForm.elements[0].value
                                };
                                postTempData(JSON.stringify(details)).
                                    then((tempStatus) => {
                                        if(tempStatus.success === 'true')
                                            location.href = './student.html';
                                        else
                                            alert('Something Happened! Please Try Again!');
                                    });
                                }
                                else if(exists === true){
                                    alert("Test Already Completed! Select Another Subject or Log Out!");
                                    subjectForm.reset();
                                }
                            });
                    });
            }
            else{
                alert('Test not Appointed for This Subject! Try Other Subject!');
                subjectForm.reset();
            }
        });
});