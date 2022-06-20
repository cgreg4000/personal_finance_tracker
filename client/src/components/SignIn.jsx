import React from "react";
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";

const SignIn = () => {
    return (
        <>
            <div className="flex-branding">
                <img className="logo" src="/images/finance-svgrepo-com.svg" alt="logo" />
                <h1 className=' m-4'>myFinancePal</h1>
            </div>
            <hr />
            <div className="row container">
                <div className="col">
                    <RegistrationForm></RegistrationForm>
                </div>
                <div className="col">
                    <LoginForm></LoginForm>
                </div>
            </div>
        </>

    )
}

export default SignIn;