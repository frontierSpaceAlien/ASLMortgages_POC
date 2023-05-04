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
app.post("/investor", async(req,res) => {
   try{      
     const {ird,investor,bankaccount,rwt,dob,country} = req.body;
     const newasl = await pool.query("INSERT INTO investor (ird,investor,bankaccount,rwt,dob,country) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
     [ird,investor,bankaccount,rwt,dob,country]
     )

     res.json(newasl.rows[0]);
   } catch(err){
     console.error(err.message);
   }
})
//get all investors
app.get("/investor",async(req,res) => {
    try {
        const allInvestor = await pool.query("SELECT * FROM investor");
        res.json(allInvestor.rows);
    } catch (err) {
        console.error(err.message);
    }
})
//get a investor
app.get("/investor/:id",async(req,res) => {
    try {
        const{id} = req.params;
        const investor = await pool.query("SELECT * FROM investor WHERE id = $1",[id])
        res.json(investor.rows[0]);
    } catch (error) {
        console.error(err.message);
    }
})
//update a investor

app.put("/investor/:id", async(req,res) => {
    try {
        const { id } = req.params;
        const { ird, investor, bankaccount, rwt, dob, country } = req.body;
        const updateInvestor = await pool.query(
            "UPDATE investor SET ird = $1, investor = $2, bankaccount = $3, rwt = $4, dob = $5, country = $6 WHERE id = $7 RETURNING *",
            [ird, investor, bankaccount, rwt, dob, country, id]
        )
        res.json(updateInvestor.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//delete a investor

app.delete("/investor/:id", async(req,res) => {
    try {
        const { id } = req.params;
        const deleteInvestor = await pool.query("DELETE FROM investor WHERE id = $1",[id])
        res.json("Investor was deleted!");
    } catch (err) {
        console.error(err.message);
    }
})

app.listen(5000, () => {
    //callback function to tell the server running
    console.log('Server is running on port 5000');
});