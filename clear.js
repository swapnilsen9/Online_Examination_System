let questions = document.getElementById('questions');
let results = document.getElementById('results');

async function clearQuestions()
{
	let response = await fetch("http://localhost:5000/api/clearquestions");
	let credentials = await response.json();
	return credentials;
}

async function clearResults()
{
	let response = await fetch("http://localhost:5000/api/clearresults");
	let credentials = await response.json();
	return credentials;
}

questions.addEventListener('click', () => {
    clearQuestions().then((res) => {
        if(res.success == 'true')
            alert("Questions Cleared Successfully!");
    });
});

results.addEventListener('click', () => {
    clearResults().then((res) => {
        if(res.success == 'true')
            alert("Results Cleared Successfully!");
    });
});