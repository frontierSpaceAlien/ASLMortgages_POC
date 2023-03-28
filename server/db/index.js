const { Pool } = require("pg"); 

const pool = new Pool(); //Automatically gets database information from .env file.
module.exports = { 
    query: (text, params) => pool.query(text, params),
}; 