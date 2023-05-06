CREATE DATABASE aslmortgages; 

CREATE TABLE borrower(
    borrower_id SERIAL PRIMARY KEY,
    borrowerFirstName VARCHAR(255),
    borrowerLastName VARCHAR(255),
    BorrowerStreetAddress VARCHAR(255),
    borrowerContactNumber VARCHAR(255),
    borrowerEmailAddress VARCHAR(255)
);

CREATE TABLE investor(
    investor_id SERIAL PRIMARY KEY,
    investorFirstName VARCHAR(255),
    investorLastName VARCHAR(255),
    investorStreetAddress VARCHAR(255),
    investorContactNumber VARCHAR(255),
    investorEmailAddress VARCHAR(255)
);

CREATE TABLE loan(
    id SERIAL PRIMARY KEY,
    borrower VARCHAR(255),
    capitalised VARCHAR(255), 
    netAdv FLOAT, 
    intRate FLOAT, 
    interest FLOAT, 
    dailyInt FLOAT,
    monthInt FLOAT,
    manageFee FLOAT,
    brokerFee FLOAT,
    legalFee FLOAT,
    variation FLOAT,
    totalRepay FLOAT,
    startDate DATE,
    endDate DATE,
    dayIntDue FLOAT,
    loan VARCHAR(255),
    active BOOLEAN, 
    investors VARCHAR(255)[],
    region VARCHAR(255)
);

INSERT INTO loan (capitalised, netAdv, intRate, interest, dailyInt, monthInt, manageFee, brokerFee, legalFee, variation, totalRepay, startDate, endDate, dayIntDue, loan, active, investors)
VALUES (TRUE, 326860.2, 14.95, '0', 0.0, 0.0, 7000, 0.0, 0.0, 0.0, 0.0, '2022-03-10', '2022-03-10', 10, 'Stamos2022', 'Yes', ARRAY[  
      'ASL Mortgages Limited_Niehaus Family Trust 2',
      'Investor 2_Niehaus Family Trust 2',
      'Tenki Trust_Niehaus Family Trust 2',
      'Investor 4',
      'Investor 5',
      'Investor 6'
]);