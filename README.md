# ASLMortgages_POC
Proof-of-concept Loan Management website made for ASL Mortgages.

# Get Started
Make a copy of this repository into your own repository.

# Requirements
This project must be compiled with VS Code. 

It uses React, Node, Express and PostgreSQL.

In order to have a working database, please install PostgreSQL on your local machine and configure it. ALL the tables are provided in this folder: server/databasq.sql

Optionally, you can use Postman to monitor the activity of the database.

# Installation
Once the folder is added as a workspace in VS Code, install the dependencies in the client folder.
```
cd client
npm install
```
Install dependencies in server folder.
```
cd server
npm install
```

# Running the application
Open two split terminals in VS Code and do these commands
```
cd client
npm start
```
```
cd server
npm start
```
This starts both the frontend and backend. The order in which you start it does not matter.




