import React from "react";
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";

const SignIn = () => {
    return (
        <div className="row">
            <h1 className='h1 m-3' >Personal Finance Tracker</h1>
            <div className="col">
                <RegistrationForm></RegistrationForm>
            </div>
            <div className="col">
                <LoginForm></LoginForm>
            </div>
        </div>
    )
}

export default SignIn;