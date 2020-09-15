let resultForm = document.getElementById('resultForm');
let submit_btn = document.getElementById('submit_btn');
let scoreLabel = document.getElementById('score');

document.getElementById('goBackBtn').addEventListener('click', () => location.href = './login.html');

async function getResult()
{
	let response = await fetch("http://localhost:5000/api/result");
	let resultDetails = await response.json();
	return resultDetails;
}

submit_btn.addEventListener('click', (e) => {
    e.preventDefault();
    getResult().
        then((resultDetails) => {
            let resultExists = false;
            let len = resultDetails.length;
            for(let i=0; i<len; i++){
                if(resultDetails[i].username === resultForm.elements[0].value && resultDetails[i].subject === resultForm.elements[1].value){
                    scoreLabel.innerHTML = "Score: "+resultDetails[i].score+"/"+resultDetails[i].questionCount;
                    resultExists = true;
                    break;
                }
            }
            if(resultExists === false){
                alert('Result Not Found! Please Try Again!');
                scoreLabel.innerHTML = 'Score: Fill Details & Click Submit to See Score';
                resultForm.reset();
            }
        });
});