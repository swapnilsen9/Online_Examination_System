const express = require('express');
const uuid = require('uuid');
const credentials = require('./json/credentials.json');
const questions = require('./json/questions.json');
const fs = require('fs');
const cors = require('cors');

const app = express();

//Init CORS
app.use(cors());

const PORT = 5000;

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

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));