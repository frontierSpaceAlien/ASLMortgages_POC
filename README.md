# ASLMortgages_POC
Proof-of-concept Loan Management website made for ASL Mortgages.

# Requirements
This project must be compiled with VS Code. 

It uses React, Node, Express and PostgreSQL.

In order to have a working database, please install PostgreSQL on your local machine and configure it. ALL the tables are provided in this folder: server/databasq.sql

Optionally, you can use Postman to monitor the activity of the database.

# Overview
### Borrower Information
All borrower information can be viewed in the Borrower tab. Each row is collapsible which can view more info on for each borrower.

![firefox_W84RfJpnOH](https://github.com/frontierSpaceAlien/ASLMortgages_POC/assets/104743984/acab7e68-c31a-4669-be10-452373cfcd05)

### Investor Information
Similar to the borrower page, all investor information can be viewed in the Investor tab. 

You can add, edit and delete any investor located in the table.

![firefox_bTHDJAAT1m](https://github.com/frontierSpaceAlien/ASLMortgages_POC/assets/104743984/167754d4-4024-4364-9001-0d9860f090e2)



### Loan Information
All loans can be viewed in the Loans tab. When a loan is not selected, the boxes display default data.

When selecting a loan, all boxes will be filled with the relevant information. The information of each loan is pulled from a PostgreSQL database. The PostgreSQL database is hosted locally (Consider a cloud-based service to host the database.)

Also selecting a loan calculates all relevant interest based on the loans capitalisation.

![image](https://github.com/frontierSpaceAlien/ASLMortgages_POC/assets/104743984/d678f0bc-d36c-411f-b549-eb89d7bf854b)

### Updating Loan Information
You can update each loan that is in the table and adjust the various fields the form provides.

![image](https://github.com/frontierSpaceAlien/ASLMortgages_POC/assets/104743984/4df348b8-622f-42ea-900c-da331236b1c6)

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




