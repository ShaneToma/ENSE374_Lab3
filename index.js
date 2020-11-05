//This file has to do with Node.js
const fs = require("fs");   //includes file access using node.js

//****This is express.js******

const express = require("express"); //express if for running a server
const app = express();              //shortcut for easier future use
const port = 3000;                  //define port to run on

app.listen (port, function(){
    console.log("server is running on port" + port);
});

app.set("view engine","ejs");   //gives not set engine error without this


//create items and make a array of them to throw at our .json "database"
var User = {    //create "User" item
    username: "",
    password: ""
};

var Users = [User, User, User]; //create "Users" array
Users[0] = {username: "name0", password: "0"};
Users[1] = {username: "name1", password: "1"};
Users[2] = {username: "name2", password: "2"};


var Task = {    //create "Task" item
    id: "",
    name: "",
    owner: User,
    creator: User,
    done: false,
    cleared: false
};

var Tasks = [Task, Task, Task, Task, Task]; //create "Tasks" array
Tasks[0] = {id: "0", name: "Unclaimed", owner: undefined, creator: Users[0], done: false, cleared: false};
Tasks[1] = {id: "1", name: "claimed user1, own, not done", owner: Users[0], creator: Users[0], done: false, cleared: false};
Tasks[2] = {id: "2", name: "claimed user2, others, not done", owner: Users[1], creator: Users[0], done: false, cleared: false};
Tasks[3] = {id: "3", name: "claimed user1, own, done", owner: Users[1], creator: Users[1], done: true, cleared: false};
Tasks[4] = {id: "4", name: "claimed user2, others, done", owner: Users[1], creator: Users[0], done: true, cleared: false};


//Access .json files we are using as a database and store the data we have encoded in json
fs.writeFileSync(__dirname + "/users.json", JSON.stringify(Users), "utf8", function(err){   //For "Users"
    if (err){
        console.log(err);
        return;
    }
});

fs.writeFileSync(__dirname + "/tasks.json", JSON.stringify(Tasks), "utf8", function(err){   //For "Tasks"
    if (err){
        console.log(err);
        return;
    }
});


//create and store json objects of the database data depending on what page is accessed 
var storedUsers = new Object();
var storedTasks = new Object();

app.get("/", function(req,res){
    res.render("index");
});

app.get("/index", function(req,res){
    fs.readFile('users.json', 'utf8', function(err, data){ 
        storedUsers = JSON.parse(data); 
    }); 
});

app.get("/todo", function(req,res){
    //collect the user info
    fs.readFile('users.json', 'utf8', function(err, data){ 
        storedUsers = JSON.parse(data); 
    }); 
    //collect the task info
    fs.readFile('tasks.json', 'utf8', function(err, data){ 
        storedTasks = JSON.parse(data); 
        res.render("todo", {storedTasks: storedTasks, storedUsers: storedUsers});
    });
});
