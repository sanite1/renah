import classes from "./Login.module.css";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"
import { FaFacebookF } from "react-icons/fa"

const Login = (props) => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.loginWrapper}>
                <div className={classes.carousel}>
                    {/* Create a carousel and put abeg */}
                    {/* <img className={classes.displayImg} src="https://i.ibb.co/5cp66td/img33.jpg" alt="" /> */}
                </div>
                <div className={classes.loginForm}>
                    <h1>Login</h1>
                    <div className={classes.signinOpts}>
                        <button className={`${classes.signinOptsBtnGoogle} ${classes.btns}`} onClick={props.onLoginClick}><FcGoogle className={classes.logo} /> Sign up with Google</button>
                        <button className={`${classes.signinOptsBtnFacebook} ${classes.btns}`} onClick={props.onSignupClick}><FaFacebookF className={`${classes.logo} ${classes.fb}`} />Sign up with Facebook</button>
                    </div>
                    <p className={classes.text}>Or Sign in with email address below</p>
                    <input className={classes.inputBox} type="text" placeholder="Email Address" name="username"/>
                    <br/>
                    {/* <p class="hidden">Not a valid username</p> */}
                    <br/>
                    <input className={classes.inputBox} type="password" placeholder="Password" name="password"/>
                    
                    <br/>
                    <p className={classes.passReset}>Fogot Password?</p>
                    <br/>
                    {/* <input className={classes.check} type="checkbox" name="check"/> */}
                    <button className={classes.loginBtn} onClick={props.onLoginClick}>Login</button>
                    <p className={classes.signupOpt}>Dont have an account? <Link to="/signup" className={classes.signupBtn}  onClick={props.onSignupClick}>Sign Up</Link></p>
                </div>
                
            </div>
        </div>
    );
}

export default Login