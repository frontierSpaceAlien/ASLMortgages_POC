require("dotenv").config();
const express = require("express");
const db = require("./db/index.js");
const cors = require("cors");

const morgan = require("morgan");

const app = express();  

app.use(cors()); 
app.use(express.json());

// ROUTES 
// BORROWER ROUTES

//Get all borrowers
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
            "INSERT INTO borrower (borrowerFirstName, borrowerLastName, borrowerStreetAddress, borrowerContactNumber, borrowerEmailAddress) VALUES ($1, $2, $3, $4, $5) returning *",
                 [req.body.borrowerFirstName, req.body.borrowerLastName, req.body.borrowerStreetAddress, req.body.borrowerContactNumber, req.body.borrowerEmailAddress]);
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
            "UPDATE borrower SET borrowerFirstName = $1, borrowerLastName = $2, borrowerStreetAddress = $3, borrowerContactNumber = $4, borrowerEmailAddress = $5 where borrower_id = $6 returning *", 
            [
                req.body.borrowerFirstName, 
                req.body.borrowerLastName, 
                req.body.borrowerStreetAddress, 
                req.body.borrowerContactNumber,
                req.body.borrowerEmailAddress,
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

// INVESTOR ROUTES

// Get all Investor Routes
app.get("/investor", async (req, res) => {

    try {
        const results = await db.query("SELECT * FROM investor")
        res.status(200).json({
            status: "success",
            data: {
                investor: results.rows,
            },
        });  
    } catch (err) {
        console.error(err);        
    }
});

//Get a Investor
app.get("/investor/:id", async (req, res) => {
    //http://localhost:3006/investor/:id
    try {
        const results = await db.query("SELECT * FROM investor WHERE investor_id = $1", [req.params.id]);
        res.status(200).json({
            status: "success",
            data: {
                investor: results.rows[0],
            },    
        })
    } catch (err) {
        console.log(err);
    }

});

// Create a Investor
app.post("/investor", async(req, res) => {
    console.log(req.body);
    try {
        const results = await db.query(
            "INSERT INTO investor (investorFirstName, investorLastName, investorStreetAddress, investorContactNumber, investorEmailAddress) VALUES ($1, $2, $3, $4, $5) returning *",
                 [req.body.investorFirstName, req.body.investorLastName, req.body.investorStreetAddress, req.body.investorContactNumber, req.body.investorEmailAddress]);
        console.log(results);        
         res.status(201).json({
            status: "success",
            data: {
                investor: results.rows[0],
            },    
        })
    } catch (err) {
        console.error(err);
    }
});

// Update a Investor 
app.put("/investor/:id", async (req, res) => {
    try {
        const results = await db.query(
            "UPDATE investor SET investorFirstName = $1, investorLastName = $2, investorStreetAddress = $3, investorContactNumber = $4, investorEmailAddress = $5 where investor_id = $6 returning *", 
            [
                req.body.investorFirstName, 
                req.body.investorLastName, 
                req.body.investorStreetAddress, 
                req.body.investorContactNumber,
                req.body.investorEmailAddress,
                req.params.id
            ]);

        res.status(200).json({
            status: "success",
            data: {
                investor: results.rows[0],
            },    
        })
    } catch (err) {
        console.error(err);
    }
});

// Delete a Investor 
app.delete("/investor/:id", async (req, res) => {
    try {
        const result = db.query("DELETE FROM investor WHERE investor_id = $1", [req.params.id]);
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