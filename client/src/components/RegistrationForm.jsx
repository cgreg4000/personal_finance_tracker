import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const RegistrationForm = () => {

    const history = useHistory()
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("");
    let [formErrors, setFormErrors] = useState({})

    const registerHandler = (e) => {
        e.preventDefault();
        let registrationInfo = { firstName, lastName, email, password, confirmPassword }
        console.log("HERE IS THE REGISTRATION INFORMATION")
        console.log(registrationInfo)
        axios.post("http://localhost:8000/api/users/register", registrationInfo, { withCredentials: true })
            .then(response => {
                console.log(response)
                if (response.data.errors) {
                    setFormErrors(response.data.errors)
                } else {
                    history.push("/dashboard")
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <h3 className="mb-3">Register</h3>
            <form onSubmit={registerHandler}>
                <div className="form-group">
                    <label className="mb-1">First Name</label>
                    <input type="text" name="firstName" className="form-control" onChange={(e) => setFirstName(e.target.value)} />
                    <p className="color-red">{formErrors.firstName?.message}</p>
                </div>
                <div className="form-group">
                    <label className="mb-1">Last Name</label>
                    <input type="text" name="lastName" className="form-control" onChange={(e) => setLastName(e.target.value)} />
                    <p className="color-red">{formErrors.lastName?.message}</p>
                </div>
                <div className="form-group">
                    <label className="mb-1">Email</label>
                    <input type="text" name="email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                    <p className="color-red">{formErrors.email?.message}</p>
                </div>
                <div className="form-group">
                    <label className="mb-1">Password</label>
                    <input type="password" name="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                    <p className="color-red">{formErrors.password?.message}</p>
                </div>
                <div className="form-group">
                    <label className="mb-1">Confirm Password</label>
                    <input type="password" name="confirmPassword" className="form-control" onChange={(e) => setConfirmPassword(e.target.value)} />
                    <p className="color-red">{formErrors.confirmPassword?.message}</p>
                </div>
                <input type="submit" className="btn btn-dark" value="Register" />
            </form>
        </div>
    )
}

export default RegistrationForm;