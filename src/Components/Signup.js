import React, { useEffect } from "react";
import classes from "./Signup.module.css";
// import { Container, Row, Col } from 'react-bootstrap';
import { FcGoogle } from "react-icons/fc"
import { FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import useFetch from "../useFetch";
import { useHistory } from "react-router-dom"
import Navbar from "./Navbar";
import XLoginMethod from "./MiniComponents/Xloginmethod"
import Footer from "./Footer";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import api from "../api/api"

const Signup = () => {

    let navigate = useNavigate();
    
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [ fullName, setfullName] = useState("");
    const [ phoneNumber, setPhoneNumber] = useState("");
    const [ password, setPassword] = useState("");
    const [ passwordRepeat, setPasswordRepeat] = useState("");
    const [ email, setEmail] = useState("");
    const [ errorMessage, seterrorMessage] = useState("");

    // let history = useHistory();
 
    const onSignupClick = (e) => {
        e.preventDefault();

        if(password === "" || email === "" || fullName === "" || passwordRepeat === "" || phoneNumber === "") {
            seterrorMessage("All fields required");
        } else {
            if(password === passwordRepeat) {
                if (phoneNumber.length === 11) {
    
                    const details = {
                        password: password,
                        email: email,
                        fullName: fullName,
                        phoneNumber: phoneNumber
                    }
    
                    const signUp = async () => {
                        try {
                            const response = await api.post("/api/signup", details)
                            if(response.data.success === false){
                                seterrorMessage(response.data.err.message); 
                            }else{
                                navigate('/login')
                            }
                        } catch(err) {
                            if(err.response) {
                                console.log("Catch Block");
                                console.log(err);
                                console.log(err.response);
                                
                                // seterrorMessage(err.response);   
                            }
                        }
                    }
                    signUp();
                    setEmail("")
                    setfullName("")
                    setPassword("")
                    setPasswordRepeat("")
                    setPhoneNumber("")
                    // history.push("/login")
                } else {
                    seterrorMessage("Invalid Phone Number");    
                    setPassword("")
                    setPasswordRepeat("")
                    setPhoneNumber("")
                }
            }else {
                seterrorMessage("Passwords don't match");    
                setPassword("")
                setPasswordRepeat("")
            }
        }

    }

    
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const callError = () => {
        setTimeout(() => {
            seterrorMessage("")
        }, 5000);
        return <Alert s={classes.errMsg} severity="error">{errorMessage}</Alert>
    };
    return (
        <div className="">
            <Navbar />
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                {"Oops!"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                    This method is currently unavailable. Please use Email method.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    Ok
                </Button>
                </DialogActions>
            </Dialog>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className={classes.wrapper}>
                <div className={classes.signupWrapper}>
                    <div className={classes.carousel}>
                        {/* Create a carousel and put abeg */}
                    </div>
                    <div className={classes.loginForm}>
                        <h1>Create Your Account</h1>
                        <div className={classes.signinOpts}>
                            <button onClick={handleClickOpen} className={`${classes.signinOptsBtnGoogle} ${classes.btns}`} ><FcGoogle className={classes.logo} /> Sign up with Google</button>
                            <button onClick={handleClickOpen} className={`${classes.signinOptsBtnFacebook} ${classes.btns}`} ><FaFacebookF className={`${classes.logo} ${classes.fb}`} />Sign up with Facebook</button>
                        </div>
                        <p className={classes.text}>Or Sign up with email address below</p>
                        <form action="">
                            {errorMessage ==="" ? "" : callError()}
                            {/* <p class={classes.errMsg}>{errorMessage}</p> */}
                            <input className={classes.inputBox} type="text" placeholder="Full Name" name="name" onChange={e => setfullName(e.target.value)} value={fullName} />
                            <br/>
                            <input className={classes.inputBox} type="text" placeholder="Phone Number" name="pnumber" onChange={e => setPhoneNumber(e.target.value)} value={phoneNumber} />
                            <br/>
                            <input className={classes.inputBox} type="email" placeholder="Email Address" name="username" onChange={e => setEmail(e.target.value)} value={email} />
                            <br/>
                            {/* <p class="hidden">Not a valid username</p> */}
            
                            <input className={classes.inputBox} type="password" placeholder="Password" name="password" onChange={e => setPassword(e.target.value)} value={password} />
                            <br/>
                            <input className={classes.inputBox} type="password" placeholder="Repeat Password" name="password" onChange={e => setPasswordRepeat(e.target.value)} value={passwordRepeat} />
                            <br/>
                            <br/>
                            {/* <input className={classes.check} type="checkbox" name="check"/> */}
                            <button className={classes.loginBtn} onClick={onSignupClick} >Sign up</button>
                        </form>
                        <p className={classes.signupOpt}>Already have an account? <Link to="/login" className={classes.signupBtn}>Login</Link></p>
                    </div>
            
                </div>
            </div>
            <Footer />
        </div>
        
    );
}

export default Signup