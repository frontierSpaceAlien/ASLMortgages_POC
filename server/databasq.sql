CREATE DATABASE aslmortgages; 

CREATE TABLE borrower(
    borrower_id SERIAL PRIMARY KEY,
    borrowerFirstName VARCHAR(255),
    borrowerLastName VARCHAR(255),
    BorrowerStreetAddress VARCHAR(255),
    borrowerContactNumber VARCHAR(255)
);

