import classes from "./Login.module.css";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"
import { FaFacebookF } from "react-icons/fa"
import useFetch from "../useFetch";
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import api from "../api/api"
import { useTheme } from '@mui/material/styles';

const Login = () => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


    const [isMobile, setIsMobile] = useState(false);
    const [isLaptop, setIsLaptop] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    
    const [ username, setUsername] = useState("");
    const [ password, setPassword] = useState("");
    const [ errorMessage, seterrorMessage] = useState("");


    useEffect(() => {
        setIsMobile(window.innerWidth <= 480 ? true : false);
        setIsTablet(window.innerWidth <= 990 && window.innerWidth > 480 ? true : false);
        setIsLaptop(window.innerWidth > 990 ? true : false);
        console.log(isLaptop, isMobile, isTablet);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLaptop, isMobile, isTablet, window.innerWidth])
    
    const navigate = useNavigate();
 
    const onLoginClick = (e) => {
        e.preventDefault();

        if(password === "" || username === "") {
            seterrorMessage("All fields required");
        } else {
            const login = async () => {
                const details = JSON.stringify({
                    password: password,
                    username: username
                })
                try {
                    const response = await api.post("/api/login", details, {headers: {'Content-Type': 'application/json'}})
                    if(response.data.success){

                        console.log("Success");
                        console.log(response.data);
                        localStorage.setItem('user', JSON.stringify(response.data.data));
                        console.log(JSON.parse(localStorage.getItem('user')));
                        navigate('/')
                        // navigate.push("/login")
                    }else{
                        // seterrorMessage(response.data.err.message);
                        seterrorMessage("Invalid username or password") 
                    }
                } catch(err) {
                    if(err.response) {
                        console.log(err.response);
                        // seterrorMessage(err.response);   
                    }
                }
            }
            login()
        }
    }
    const callError = () => {
        setTimeout(() => {
            seterrorMessage("")
        }, 5000);
        return <Alert s={classes.errMsg} severity="error">{errorMessage}</Alert>
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen = () => {
        setOpen(true);
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
            <div className={classes.wrapper}>
                <div className={classes.loginWrapper}>
                    <div className={classes.carousel}>
                        {/* Create a carousel and put abeg */}
                        {/* <img className={classes.displayImg} src="https://i.ibb.co/5cp66td/img33.jpg" alt="" /> */}
                    </div>
                    <div className={classes.loginForm}>
                        <h1>Login</h1>
                        <div className={classes.signinOpts}>
                            <button onClick={handleClickOpen} className={`${classes.signinOptsBtnGoogle} ${classes.btns}`} ><FcGoogle className={classes.logo} /> Sign up with Google</button>
                            <button onClick={handleClickOpen} className={`${classes.signinOptsBtnFacebook} ${classes.btns}`}><FaFacebookF className={`${classes.logo} ${classes.fb}`} />Sign up with Facebook</button>
                        </div>
                        <p className={classes.text}>Or Sign in with email address below</p>
                        <form action="">
                            {errorMessage ==="" ? "" : callError()}
                            <p class={classes.errMsg}>{errorMessage}</p>
                            <input className={classes.inputBox} type="text" placeholder="Email Address" name="username" onChange={e => setUsername(e.target.value)}/>
                            <br/>
                            <br />
                            <input className={classes.inputBox} type="password" placeholder="Password" name="password" onChange={e => setPassword(e.target.value)} />
            
                            <br/>
                            <p className={classes.passReset}>Fogot Password?</p>
                            <br/>
                            {/* <input className={classes.check} type="checkbox" name="check"/> */}
                            <button className={classes.loginBtn} onClick={onLoginClick}>Login</button>
                        </form>
            
                        <br/>
                        {
                            // if
                        }
                        {/* <p class="hidden">Not a valid username</p> */}
            
                        <p className={classes.signupOpt}>Dont have an account? <Link to="/signup" className={classes.signupBtn} >Sign Up</Link></p>
                    </div>
            
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Login