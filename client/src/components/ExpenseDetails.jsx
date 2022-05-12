import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { useHistory, Link } from 'react-router-dom';

const ExpenseDetails = () => {

    const { _id } = useParams();
    let [expenseDetails, setExpenseDetails] = useState({
        expenseName: "",
        expenseDate: "",
        expenseCategory: "",
        expenseAmount: 0
    })
    const history = useHistory()
    let [loggedInUser, setLoggedInUser] = useState({});

    useEffect(() => {
        axios.get("http://localhost:8000/api/users/getloggedinuser", { withCredentials: true })
            .then(response => {
                console.log("Got a logged in user.")
                console.log(response)
                setLoggedInUser(response.data.results)

            })
            .catch(err => {
                console.log("Error when getting logged in user.")
                console.log(err)
                history.push("/")
            })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/expenses/${_id}`)
            .then(response => {
                console.log(response.data.expense)
                setExpenseDetails(response.data.expense)
            })
            .catch(err => {
                console.log("Error getting details.")
                console.log(err)
            })
    }, [])

    const deleteExpense = () => {
        axios.delete(`http://localhost:8000/api/expenses/delete/${expenseDetails._id}`)
            .then(response => {
                console.log(response)
                history.push("/dashboard")
            })
            .catch(err => {
                console.log(err)
            })
    }

    const logout = () => {
        axios.get("http://localhost:8000/api/users/logout", { withCredentials: true })
            .then(response => {
                history.push("/")
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <>
            <div className="flex mt-3">
                <h1>Welcome {loggedInUser.firstName}!</h1>
                <div>
                    <Link className='btn btn-dark m-3' to="/dashboard" >Home</Link>
                    <button className="btn btn-dark" onClick={logout}>Logout</button>
                </div>
            </div>
            <div>
                <h3>{expenseDetails.expenseName}</h3>
                <p className='mt-3'>Date: {expenseDetails.expenseDate.substring(0, 10)}</p>
                <p>Category: {expenseDetails.expenseCategory}</p>
                <p>Amount: ${expenseDetails.expenseAmount.toFixed(2)}</p>
                <Link className="btn btn-dark m-2" to={`/expenses/update/${expenseDetails._id}`}>Update</Link>
                <button className='btn color-delete text-white m-2' onClick={deleteExpense} >Delete</button>
            </div>
        </>
    )
}

export default ExpenseDetails;