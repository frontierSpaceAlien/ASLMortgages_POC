
// import React, {Fragment, useState} from "react";

// const Borrower = () => {
//     const [inputs, setInputs] = useState({
//         borrowerFirstName: "",
//         borrowerLastName: "",
//         borrowerStreetAddress: "",
//         borrowerContactNumber: ""
//     })

//     const { borrowerFirstName, borrowerLastName, borrowerStreetAddress, borrowerContactNumber } = inputs; 
//     const onChange = (e) => {
//         setInputs ({...inputs, [e.target.name] : e.target.value});
//     }; 

//     const onSubmitForm = async (e) =>{
//         e.preventDefault();
//         try {
//             console.log("It made it to submit form");

//             const body = {borrowerFirstName, borrowerLastName, borrowerStreetAddress, borrowerContactNumber}
           
//             const response = await fetch("http://localhost:3006/borrower", {
//                 method: "POST",
//                 headers: {"Content-Type" : "application/json"},
//                 body: JSON.stringify(body)
//             });
//             console.log("It made it to here");

//             const parseRes = await response.json()
//             console.log(parseRes);
           
//         } catch (err) {
//             console.error(err.message);
//         }
//     }
//     return(
//         <Fragment>
//             <h1 className="text-centre my-5">Create a Borrower</h1>
//             <form onSubmit={onSubmitForm}>
//                 <input 
//                     type="borrowerFirstName" 
//                     name="borrowerFirstName" 
//                     placeholder="firstName" 
//                     className="form-control my-3"
//                     value = {borrowerFirstName}
//                     onChange = {e => onChange(e)}
//                 />
//                 <input 
//                     type="borrowerLastName" 
//                     name="borrowerLastName" 
//                     placeholder="lastName"
//                     className="form-control my-3"
//                     value = {borrowerLastName}
//                     onChange = {e => onChange(e)}
//                 />
//                 <input 
//                     type="borrowerStreetAddress" 
//                     name="borrowerStreetAddress" 
//                     placeholder="streetAddress"
//                     className="form-control my-3"
//                     value = {borrowerStreetAddress}
//                     onChange = {e => onChange(e)}
//                 />
//                 <input 
//                     type="borrowerContactNumber" 
//                     name="borrowerContactNumber" 
//                     placeholder="contactNumber"
//                     className="form-control my-3"
//                     value = {borrowerContactNumber}
//                     onChange = {e => onChange(e)}
//                 />
//                 <button className ="btn btn-success btn-block"> Submit</button>
//             </form>
//          </Fragment>

//     );
// };
// export default Borrower;


// /*
// borrower_id SERIAL PRIMARY KEY,
//     borrowerFirstName VARCHAR(255),
//     borrowerLastName VARCHAR(255),
//     BorrowerStreetAddress VARCHAR(255),
//     borrowerContactNumber VARCHAR(255)
// */