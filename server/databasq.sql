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
