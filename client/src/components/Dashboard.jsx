import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

const Dashboard = () => {

    const history = useHistory();
    let [loggedInUser, setLoggedInUser] = useState({});
    let [expenseList, setExpenseList] = useState([]);
    let [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8000/api/users/getloggedinuser", { withCredentials: true })
            .then(response => {
                console.log("Got a logged in user.")
                console.log(response)
                setLoggedInUser(response.data.results)
                axios.get(`http://localhost:8000/api/expenses/users/${response.data.results._id}`)
                    .then(res => {
                        setExpenseList(res.data.expenses)
                        console.log(res.data.expenses)
                    })
                    .catch(err => {
                        console.log("Error getting expenses.")
                        console.log(expenseList)
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log("Error when getting logged in user.")
                console.log(err)
                history.push("/")
            })
    }, [])

    // const filterCategory = (category) => {
    //     console.log(category)

    // }

    const logout = () => {
        axios.get("http://localhost:8000/api/users/logout", { withCredentials: true })
            .then(response => {
                console.log("User has been logged out.")
                history.push("/")
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <div className="flex mt-3">
                <h1>Welcome {loggedInUser.firstName}!</h1>
                <div>
                    <Link className="btn btn-dark m-3" to="/expenses/add">Add Expense</Link>
                    <button className="btn btn-dark" onClick={logout}>Logout</button>
                </div>
            </div>
            <h2 className="mb-4">Expense Dashboard</h2>
            <select onChange={(e) => { setSelectedCategory(e.target.value) }}>
                <option value="">--</option>
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
            <table className="table table-striped">
                <thead>
                    <tr className="table-secondary">
                        <th>Name</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        expenseList.map((expenseObject) => {
                            if (selectedCategory.length !== 0){
                                if (expenseObject.expenseCategory === selectedCategory){
                                    return (
                                        <tr key={`${expenseObject._id}`}>
                                            <td>{expenseObject.expenseName}</td>
                                            <td>{expenseObject.expenseDate.substring(0, 10)}</td>
                                            <td>{expenseObject.expenseCategory}</td>
                                            <td>${expenseObject.expenseAmount.toFixed(2)}</td>
                                            <td><Link className="color-blue" to={`/expenses/update/${expenseObject._id}`}>Edit</Link></td>
                                        </tr>
                                    )
                                }
                            }else{
                                return (
                                    <tr key={`${expenseObject._id}`}>
                                        <td>{expenseObject.expenseName}</td>
                                        <td>{expenseObject.expenseDate.substring(0, 10)}</td>
                                        <td>{expenseObject.expenseCategory}</td>
                                        <td>${expenseObject.expenseAmount.toFixed(2)}</td>
                                        <td><Link className="color-blue" to={`/expenses/update/${expenseObject._id}`}>Edit</Link></td>
                                    </tr>
                                )
                            }
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Dashboard;