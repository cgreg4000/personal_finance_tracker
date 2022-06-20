import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const LoginForm = () => {

    const history = useHistory()
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [formErrors, setFormErrors] = useState("")

    const loginHandler = (e) => {
        e.preventDefault();
        let loginInfo = { email, password };
        axios.post("http://localhost:8000/api/users/login", loginInfo, { withCredentials: true })
            .then(response => {
                console.log(response)
                if (response.data.error) {
                    setFormErrors(response.data.error)
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
            <h2 className="mb-4 mt-3" >Login</h2>
            <form onSubmit={loginHandler}>
                <div className="form-group mb-3">
                    <label className="mb-1">Email</label>
                    <input type="text" name="email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label className="mb-1">Password</label>
                    <input type="password" name="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <p className="text-danger">{formErrors}</p>
                <input type="submit" className="btn btn-green mt-2" value="Login" />
            </form>
        </div>
    )
}

export default LoginForm;