import React from "react";
import classes from "./Signup.module.css";
// import { Container, Row, Col } from 'react-bootstrap';
import { FcGoogle } from "react-icons/fc"
import { FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom"

const Signup = (props) => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.signupWrapper}>
                <div className={classes.carousel}>
                    {/* Create a carousel and put abeg */}
                </div>
                <div className={classes.loginForm}>
                    <h1>Create Your Account</h1>
                    <div className={classes.signinOpts}>
                        <button className={`${classes.signinOptsBtnGoogle} ${classes.btns}`} onClick={props.onLoginClick}><FcGoogle className={classes.logo} /> Sign up with Google</button>
                        <button className={`${classes.signinOptsBtnFacebook} ${classes.btns}`} onClick={props.onSignupClick}><FaFacebookF className={`${classes.logo} ${classes.fb}`} />Sign up with Facebook</button>
                    </div>
                    <p className={classes.text}>Or Sign up with email address below</p>
                    <input className={classes.inputBox} type="text" placeholder="Full Name" name="name"/>
                    <br/>
                    <input className={classes.inputBox} type="text" placeholder="Phone Number" name="pnumber"/>
                    <br/>
                    <input className={classes.inputBox} type="email" placeholder="Email Address" name="username"/>
                    <br/>
                    {/* <p class="hidden">Not a valid username</p> */}
                    
                    <input className={classes.inputBox} type="password" placeholder="Password" name="password"/>
                    <br/>
                    <input className={classes.inputBox} type="password" placeholder="Repeat Password" name="password"/>
                    <br/>
                    <p className={classes.passReset}>Fogot Password?</p>
                    <br/>
                    {/* <input className={classes.check} type="checkbox" name="check"/> */}
                    <button className={classes.loginBtn} onClick={props.onLoginClick}>Sign up</button>
                    <p className={classes.signupOpt}>Already have an account? <Link to="/login" className={classes.signupBtn}  onClick={props.onSignupClick}>Login</Link></p>
                </div>
                    
            </div>
        </div>
        
    );
}

export default Signup