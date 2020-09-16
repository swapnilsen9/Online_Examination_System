let submitAnswerBtn = document.getElementById('submitAnswer');
let questionLabel = document.getElementById('questionLabel');
let question = document.getElementById('question');
let option1label = document.getElementById('option1label');
let option2label = document.getElementById('option2label');
let option3label = document.getElementById('option3label');
let option4label = document.getElementById('option4label');
let studentForm = document.getElementById('studentForm');
let first = true;

document.getElementById('resetBtn').addEventListener('click', () => studentForm.reset());
let questionCounter = 0;
let noOfQuestions = 0;
let count = -1;
let correctAnswer;
let score1 = 0;
let questionIndexes = new Array();
let questionIndexesLen;

let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

async function postResult(details){
    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: details,
        redirect: 'follow'
      };
    let response = await fetch("http://localhost:5000/api/result", requestOptions)
    let resultStatus = await response.json();
    return resultStatus;
}

async function getQuestions()
{
	let response = await fetch("http://localhost:5000/api/questions");
	let questions = await response.json();
	return questions;
}

async function getData()
{
	let response = await fetch("http://localhost:5000/api/tempdetails");
	let tempDetails = await response.json();
	return tempDetails;
}

function updateQuestion(i){
    getQuestions().
        then((questions) => {
            questionCounter++;
            questionLabel.innerHTML = "Question " + questionCounter;
            question.innerHTML = questions[i].question;
            option1label.innerHTML = questions[i].option1;
            option2label.innerHTML = questions[i].option2;
            option3label.innerHTML = questions[i].option3;
            option4label.innerHTML = questions[i].option4; 
            correctAnswer = questions[i].correctOption;
        });
}

function countNoOfQuestions(){
    alert("After Pressing Ok The Test will Start Immediately. You Cannot Log Out Once The Test has Started!");
    getData().
        then((tempDetails) => {
            let subject = tempDetails.subject;
            getQuestions().
                then((questions) => {
                    let len = questions.length;
                    for(let i=0; i<len; i++){
                        if(questions[i].subject === subject)
                            noOfQuestions++;
                    }
                    for(let i=0; i<noOfQuestions; i++){
                        for(let j=count+1; j<len; j++){
                            if(questions[j].subject === subject){
                                questionIndexes[i] = j;
                                count = j;
                                break;
                            }
                        }
                    }
                    questionIndexesLen = questionIndexes.length;
                    updateQuestion(questionIndexes[questionCounter]);
                });
        });
}

countNoOfQuestions();

submitAnswerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let val;
    let radios = studentForm.elements["answer"];
    for(let i=0, len=radios.length; i<len; i++) {
        if ( radios[i].checked ) { // radio checked?
            val = radios[i].value; // if so, hold its value in val
            break; // and break out of for loop
        }
    }
    if(val){
        if(val === correctAnswer){
            score1++;
            studentForm.reset();
        }
        studentForm.reset();
        console.log(questionCounter);
        if(questionCounter < questionIndexesLen)
            updateQuestion(questionIndexes[questionCounter]);
        else if(questionCounter === questionIndexesLen){
            getData()
                .then((tempDetails) => {
                    let resultData = {
                        username : tempDetails.username,
                        subject : tempDetails.subject,
                        score : score1,
                        questionCount : questionCounter
                    }
                    postResult(JSON.stringify(resultData)).
                                then((resultStatus) => {
                                    if(resultStatus.success === 'true'){
                                        alert("Test Successfully Submitted!");
                                        location.href="./login.html";
                                    }
                                    else{
                                        alert("Something Happened! Please Submit Again!");
                                    }
                                });
                });
        }
    }
    else
        alert("Please Select an Answer before Submitting.");
});