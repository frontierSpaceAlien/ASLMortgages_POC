//required the library
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");



//create middleware
//cors domain to get require and response form different sources port or file
app.use(cors());
app.use(express.json()); //req.body

//ROUTES  //  
//Create a Investor table// to use await need async

//get all investors

//get a investor

//update a investor

//delete a investor

app.listen(5000, () => {
    //callback function to tell the server running
    console.log('Server is running on port 5000');
});