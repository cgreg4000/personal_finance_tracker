import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, Link } from "react-router-dom";

const NewExpenseForm = (props) => {

    let [expenseName, setExpenseName] = useState("")
    let [expenseDate, setExpenseDate] = useState(undefined)
    let [expenseCategory, setExpenseCategory] = useState("Food")
    let [expenseAmount, seteExpenseAmount] = useState(undefined)
    let [user_id, setUser_id] = useState("")
    let [formError, setFormError] = useState({})
    const history = useHistory();
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

    const submitHandler = (e) => {
        e.preventDefault();
        let expenseFormData = { expenseName, expenseDate, expenseCategory, expenseAmount, user_id: loggedInUser._id }
        console.log(expenseFormData)
        axios.post("http://localhost:8000/api/expenses/new", expenseFormData)
            .then(response => {
                console.log(response)
                if (response.data.error) {
                    setFormError(response.data.error.errors)
                }
                else {
                    history.push('/dashboard')
                }
            })
            .catch((err) => {
                console.log("there was an error")
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
            <h2 className="mb-3">Add an Expense</h2>
            <form className='form-container' onSubmit={submitHandler}>
                <div className='form-group'>
                    <label className="mb-1">Expense Name</label>
                    <input className='form-control mb-2' type="text" onChange={(e) => setExpenseName(e.target.value)} />
                    <p className='color-red'>{formError.expenseName?.message}</p>
                </div>
                <div className='form-group'>
                    <label className="mb-1">Date</label>
                    <input className='form-control mb-2' type="date" onChange={(e) => setExpenseDate(e.target.value)} />
                    <p className='color-red'>{formError.expenseDate?.message}</p>
                </div>
                <div className='form-group'>
                    <label className="mb-1">Category</label>
                    <select className="form-control mb-3" onChange={(e) => { setExpenseCategory(e.target.value) }}>
                        <option value="Food">Food</option>
                        <option value="Giving">Giving</option>
                        <option value="Health">Health</option>
                        <option value="Housing">Housing</option>
                        <option value="Insurance">Insurance</option>
                        <option value="Miscellaneous">Miscellaneous</option>
                        <option value="Personal">Personal</option>
                        <option value="Recreation">Recreation</option>
                        <option value="Saving">Saving</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Utilities">Utilities</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label className="mb-1">Amount</label>
                    <input className='form-control mb-3' type="number" step="0.01" onChange={(e) => seteExpenseAmount(e.target.value)} />
                    <p className='color-red'>{formError.expenseAmount?.message}</p>
                </div>
                <input className='btn btn-dark' type="submit" value="Create" />
            </form>
        </>
    );
}

export default NewExpenseForm;