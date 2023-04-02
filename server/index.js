//required the library
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");



//create middleware
//cors domain to get require and response form different sources port or file
app.use(cors());
app.use(express.json()); //req.body


{/*
1const [investorName, setInvestorName] = useState('');
2const [InterestBankAccount, setInterestBankAccount] = useState('');
3const [RwtRate, setRwtRate] = useState('');
4const [investorDate, setInvestorDate] = useState('');
5const [IrdNumber, setIrdNumber] = useState('');
6const [Dob, setDob] = useState('');
7const [Country, setCountry] = useState('');
*/}


//ROUTES  //  
//Create a Investor table// to use await need async
app.post("/Investor", async (req, res) => {
    //await , wait for the system before continuing
    try {
        
        const {investorName, InterestBankAccount, RwtRate, investorDate, IrdNumber , Dob, Country, description} = req.body;
        const newInvestor = await pool.query(
            "INSERT INTO Investor (description, investorName, InterestBankAccount, RwtRate, investorDate, IrdNumber , Dob, Country) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [description, investorName, InterestBankAccount, RwtRate, investorDate, IrdNumber , Dob, Country]
        );

        res.json(newInvestor.rows[0]);
        
    } catch (error) {
        console.error('sorry, something went wrong', error.message);
    }
    
})

//get all investors
app.get("/Investor", async (req, res) => {
    try {
      const allInvestors = await pool.query("SELECT * FROM Investor");
      res.json(allInvestors.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

//get a investor
app.get("/Investor/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const Investor = await pool.query("SELECT * FROM Investor WHERE investor_id = $1", 
      [id]);
  
      res.json(Investor.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });


//update a investor
app.put("/Investor/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { description,  } = req.body;
      const updateInvestor = await pool.query(
        "UPDATE Investor SET description = $1 WHERE investor_id = $2",
        [description, id]
      );
  
      res.json("Investor was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });

  

//delete a investor
app.delete("/Investor/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteInvestor = await pool.query("DELETE FROM Investor WHERE investor_id = $1", [
        id
      ]);
      res.json("Investor was deleted!");
    } catch (err) {
      console.log(err.message);
    }
  });
  

app.listen(5000, () => {
    //callback function to tell the server running
    console.log('Server is running on port 5000');
});