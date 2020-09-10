let submitBtn = document.getElementById("submitQuestions");
let teacherForm = document.getElementById("teacherForm");
let logoutBtn = document.getElementById("logoutBtn");
let resetBtn = document.getElementById("resetBtn");
let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

async function postData(details){
    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: details,
        redirect: 'follow'
      };
    let response = await fetch("http://localhost:5000/api/questions", requestOptions)
    let quesStatus = await response.json();
    return quesStatus;
}

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let val;
    let radios = teacherForm.elements["answer"];
    for (let i=0, len=radios.length; i<len; i++) {
        if ( radios[i].checked ) { // radio checked?
            val = radios[i].value; // if so, hold its value in val
            break; // and break out of for loop
        }
    }
    if(!val || !teacherForm.elements[1].value || !teacherForm.elements[4].value || !teacherForm.elements[5].value || !teacherForm.elements[8].value || !teacherForm.elements[9].value)
        alert("Please Fill All Fields!");
    else{
        let formData = {
            subject : teacherForm.elements[0].value,
            question : teacherForm.elements[1].value,
            option1 : teacherForm.elements[4].value,
            option2 : teacherForm.elements[5].value,
            option3 : teacherForm.elements[8].value,
            option4 : teacherForm.elements[9].value,
            correctOption : val
        };
        postData(JSON.stringify(formData)).
            then((quesStatus) => {
                if(quesStatus.success === 'true'){
                    alert("Question Added!");
                    teacherForm.reset();
                }
                else{
                    alert("Question Could Not Be Added! Please Try Again!")
                }
            });
    }
})

logoutBtn.addEventListener('click', () => {
    location.href="./login.html";
})

resetBtn.addEventListener('click', () => {
    teacherForm.reset();
})