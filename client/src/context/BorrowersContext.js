import React, {useState, createContext} from "react";

export const BorrowersContext = createContext();

export const BorrowersContextProvider = props => {

    const [borrowers, setBorrowers] = useState([])

    return (
        <BorrowersContext.Provider value={borrowers}>
            {props.children}
        </BorrowersContext.Provider> 
    )
}