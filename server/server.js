require("dotenv").config();
const express = require("express");
const db = require("./db/index.js");
const cors = require("cors");

const morgan = require("morgan");

const app = express();  

app.use(cors()); 
app.use(express.json());

// ROUTES // GET All Borrowers - http://localhost:3006/borrower
app.get("/borrower", async (req, res) => {

    try {
        const results = await db.query("SELECT * FROM borrower")
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                borrower: results.rows,
            },
        });  
    } catch (err) {
        console.error(err);        
    }
});

//Get a Borrower
app.get("/borrower/:id", async (req, res) => {
    //http://localhost:3006/borrower/:id
    try {
        const results = await db.query("SELECT * FROM borrower WHERE borrower_id = $1", [req.params.id]);
        //console.log(results.rows[0]);
        res.status(200).json({
            status: "success",
            data: {
                borrower: results.rows[0],
            },    
        })
    } catch (err) {
        console.log(err);
    }

});

// create a borrower
app.post("/borrower", async(req, res) => {
    console.log(req.body);
    try {
        const results = await db.query(
            "INSERT INTO borrower (borrowerFirstName, borrowerLastName, borrowerStreetAddress, borrowerContactNumber) VALUES ($1, $2, $3, $4) returning *",
                 [req.body.borrowerFirstName, req.body.borrowerLastName, req.body.borrowerStreetAddress, req.body.borrowerContactNumber]);
        console.log(results);        
         res.status(201).json({
            status: "success",
            data: {
                borrower: results.rows[0],
            },    
        })
    } catch (err) {
        console.error(err);
    }
});

// update a borrower 
app.put("/borrower/:id", async (req, res) => {
    try {
        const results = await db.query(
            "UPDATE borrower SET borrowerFirstName = $1, borrowerLastName = $2, borrowerStreetAddress = $3, borrowerContactNumber = $4 where borrower_id = $5 returning *", 
            [
                req.body.borrowerFirstName, 
                req.body.borrowerLastName, 
                req.body.borrowerStreetAddress, 
                req.body.borrowerContactNumber,
                req.params.id
            ]);

        res.status(200).json({
            status: "success",
            data: {
                borrower: results.rows[0],
            },    
        })
    } catch (err) {
        console.error(err);
    }
});

// Delete a borrower 
app.delete("/borrower/:id", async (req, res) => {
    try {
        const result = db.query("DELETE FROM borrower WHERE borrower_id = $1", [req.params.id]);
        res.status(204).json({
            status: "success", 
        });
    } catch (err) {
        console.error(err);
    }
});

const port = process.env.PORT || 3008;
app.listen(port, () => {
    console.log(`Server has started on ${port}`);
});