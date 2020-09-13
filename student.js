let submitAnswerBtn = document.getElementById('submitAnswer');
let questionLabel = document.getElementById('questionLabel');
let question = document.getElementById('question');
let option1label = document.getElementById('option1label');
let option2label = document.getElementById('option2label');
let option3label = document.getElementById('option3label');
let option4label = document.getElementById('option4label');
let studentForm = document.getElementById('studentForm');
let val;
let radios = studentForm.elements["answer"];
for (let i=0, len=radios.length; i<len; i++) {
    if ( radios[i].checked ) { // radio checked?
        val = radios[i].value; // if so, hold its value in val
        break; // and break out of for loop
    }
}
document.getElementById('resetBtn').addEventListener('click', () => studentForm.reset());
let questionCounter = 1;

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

function updateQuestion(){
    getData().
        then((tempDetails) => {
            let subject = tempDetails.subject;
            getQuestions().
                then((questions) => {
                    let len = questions.length;
                    for(let i=0; i<len; i++){
                        if(questions[i].subject === subject){
                            questionLabel.innerHTML = "Question " + questionCounter;
                            questionCounter++;
                            question.innerHTML = questions[i].question;
                            option1label.innerHTML = questions[i].option1;
                            option1labe2.innerHTML = questions[i].option2;
                            option1labe3.innerHTML = questions[i].option3;
                            option1labe4.innerHTML = questions[i].option4; 
                        }
                    }
                });
        });
}
updateQuestion();

submitAnswerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
});