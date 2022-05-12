import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router";
import { useHistory, Link } from "react-router-dom";

const UpdateExpenseForm = () => {

    const { _id } = useParams();
    const history = useHistory();
    let [expenseDetails, setExpenseDetails] = useState({
        expenseName: "",
        expenseDate: "",
        expenseCategory: "",
        expenseAmount: ""
    })
    let [formError, setFormError] = useState({})
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
                console.log(err)
            })
    }, [])

    const changeHandler = (e) => {
        setExpenseDetails({
            ...expenseDetails,
            [e.target.name]: e.target.value
        })
    }

    const updateHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/expenses/update/${_id}`, expenseDetails)
            .then((response) => {
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
            <h2 className='mb-3'>Update Expense</h2>
            <form className='form-container' onSubmit={updateHandler}>
                <div>
                    <label className="mb-1">Expense Name</label>
                    <input className='form-control mb-2' type="text" name="expenseName" onChange={changeHandler} value={expenseDetails.expenseName} />
                    <p className='color-red'>{formError.expenseName?.message}</p>
                </div>
                <div>
                    <label className="mb-1">Date</label>
                    <input className='form-control mb-2' type="date" name="expenseDate" onChange={changeHandler} value={expenseDetails.expenseDate.substring(0, 10)} />
                    <p className='color-red'>{formError.expenseDate?.message}</p>
                </div>
                <div className='form-group'>
                    <label className="mb-1">Category</label>
                    <select className="form-control mb-3" name="expenseCategory" onChange={changeHandler} value={expenseDetails.expenseCategory}>
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
                <div>
                    <label className="mb-1">Amount</label>
                    <input className='form-control mb-2' type="number" step="0.01" name="expenseAmount" onChange={changeHandler} value={expenseDetails.expenseAmount} />
                    <p className='color-red'>{formError.expenseAmount?.message}</p>
                </div>
                <div>
                    <input className='btn btn-dark' type="submit" value="Update" />
                    <button className='btn color-delete text-white m-2' onClick={deleteExpense} >Delete</button>
                </div>

            </form>

        </>
    );
}

export default UpdateExpenseForm;