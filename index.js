const express = require('express');
const uuid = require('uuid');
const credentials = require('./json/credentials.json');
const questions = require('./json/questions.json');
const tempDetails = require('./json/tempDetails.json');
const result = require('./json/result.json');
const fs = require('fs');
const cors = require('cors');

const app = express();

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if(port >= 0) {
        return port;
    }

    return false;
}

//Init CORS
app.use(cors());

var port = normalizePort(process.env.PORT || '5000');
app.set('port', port);


//Init Body Parser
app.use(express.json());

//Get All Credentials
app.get('/api/credentials', (req, res) => res.json(credentials));

//Get All Questions
app.get('/api/questions', (req, res) => res.json(questions));

//Add New Credential
app.post('/api/credentials', (req, res) => {
    var isUser = false;
    var userObj;
    const newCred = {
        id : uuid.v4(),
        username : req.body.username,
        password : req.body.password,
        type : req.body.type,
        security_question : req.body.security_question,
        security_answer : req.body.security_answer
    };

    if(!newCred.username || !newCred.password)
        return res.status(400).json({ msg : 'Please Include Both Username & Password' });

    fs.readFile('./json/credentials.json', 'utf8', (err, data) => {
        if(err){
            console.log(err);
            res.status(401).json({ success : 'false'});
        }
        else{
            userObj = JSON.parse(data);
            for(let i=0; i<userObj.length; i++){
                if(userObj[i].username == req.body.username)
                    isUser = true;
            }
            if(isUser == true)
                res.status(402).json({ msg : 'Username Already Exists!'});
            else{
                userObj.push(newCred);
                var newData = JSON.stringify(userObj);
                fs.writeFile('./json/credentials.json', newData, 'utf-8', (err) => {
                    if(err) throw err

                    res.json({msg : 'Credentials Successfully Updated', success : 'true'});
                });
            }
        }
    });    
});

//Add New Question
app.post('/api/questions', (req, res) => {
    var userObj;
    const newQuestion = {
        id : uuid.v4(),
        subject : req.body.subject,
        question : req.body.question,
        option1 : req.body.option1,
        option2 : req.body.option2,
        option3 : req.body.option3,
        option4 : req.body.option4,
        correctOption : req.body.correctOption
    };

    fs.readFile('./json/questions.json', 'utf8', (err, data) => {
        if(err){
            console.log(err);
            res.status(401).json({ success : 'false'});
        }
        else{
            userObj = JSON.parse(data);
            userObj.push(newQuestion);
            var newData = JSON.stringify(userObj);
            fs.writeFile('./json/questions.json', newData, 'utf-8', (err) => {
                if(err) throw err

                res.json({msg : 'Question Successfully Updated', success : 'true'});
            });
        }
    });    
});

//Store Temp Details
app.post('/api/tempdetailslogin', (req, res) => {
    const tempDetails = {
        username : req.body.username,
        password : req.body.password
    };
    var newData = JSON.stringify(tempDetails);
    fs.writeFile('./json/tempDetails.json', newData, 'utf-8', (err) => {
        if(err) throw err
        
        res.json({msg : 'Temp Details Successfully Added', success : 'true'});
    });  
});

//Get Temp Details
app.get('/api/tempdetails', (req, res) => res.json(tempDetails));

//Update Temp Details
app.post('/api/tempdetailssubject', (req, res) => {
    const tempDetails = {
        username : req.body.username,
        password : req.body.password,
        subject : req.body.subject
    };
    var newData = JSON.stringify(tempDetails);
    fs.writeFile('./json/tempDetails.json', newData, 'utf-8', (err) => {
        if(err) throw err
        
        res.json({msg : 'Temp Details Successfully Updated', success : 'true'});
    });  
});

//Get All Results
app.get('/api/result', (req, res) => res.json(result));

//Add New Result
app.post('/api/result', (req, res) => {
    var userObj;
    const newResult = {
        id : uuid.v4(),
        username : req.body.username,
        subject : req.body.subject,
        score : req.body.score,
        questionCount : req.body.questionCount
    };

    fs.readFile('./json/result.json', 'utf8', (err, data) => {
        if(err){
            console.log(err);
            res.status(401).json({ success : 'false'});
        }
        else{
            userObj = JSON.parse(data);
            userObj.push(newResult);
            var newData = JSON.stringify(userObj);
            fs.writeFile('./json/result.json', newData, 'utf-8', (err) => {
                if(err) throw err

                res.json({msg : 'Results Successfully Updated', success : 'true'});
            });
        }
    });    
});

//Clear Questions
app.get('/api/clearquestions', (req, res) => {
    const cleardata = [];
    var newData = JSON.stringify(cleardata);
    fs.writeFile('./json/questions.json', newData, 'utf-8', (err) => {
        if(err) throw err
        
        res.json({msg : 'Questions Cleared Successfully', success : 'true'});
    });  
});

//Clear Results
app.get('/api/clearresults', (req, res) => {
    const cleardata = [];
    var newData = JSON.stringify(cleardata);
    fs.writeFile('./json/result.json', newData, 'utf-8', (err) => {
        if(err) throw err
        
        res.json({msg : 'Results Cleared Successfully', success : 'true'});
    });  
});

app.listen(port, () => console.log(`Server started on PORT ${port}`));