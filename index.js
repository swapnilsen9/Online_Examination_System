const express = require('express');
const uuid = require('uuid');
const credentials = require('./json/credentials.json');
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

//Add New Credential
app.post('/api/credentials', (req, res) => {
    var isUser = false;
    var userObj;
    const newCred = {
        id : uuid.v4(),
        username : req.body.username,
        password : req.body.password
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

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));