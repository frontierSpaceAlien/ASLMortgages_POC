CREATE DATABASE aslclients;

CREATE TABLE investor( 
    investor_id SERIAL PRIMARY KEY,
    investorName VARCHAR(255),
    InterestBankAccount VARCHAR(255),
    IrdNumber VARCHAR(255),
    RwtRate VARCHAR(255),
    investor_id_varchar VARCHAR(255),
    Dob VARCHAR(255),
    investorDate   VARCHAR(255),
    Country VARCHAR(255),
    description VARCHAR(255),);

{/*
1const [investorName, setInvestorName] = useState('');
2const [InterestBankAccount, setInterestBankAccount] = useState('');
3const [RwtRate, setRwtRate] = useState('');
4const [investorDate, setInvestorDate] = useState('');
5const [IrdNumber, setIrdNumber] = useState('');
6const [Dob, setDob] = useState('');
7const [Country, setCountry] = useState('');
*/}