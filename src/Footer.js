import classes from "./Footer.module.css";
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

const Footer = () => {
    return (  
        <div className={classes.footerWrapper}>
            <Container>
                <Row>
                    <Col className={classes.col} lg={3} md={6}>
                        <h3 className={classes.secHeader}>HELP & INFORMATION</h3>
                        <div className={classes.rule}></div>
                        <Link to="/">Order Status</Link>
                        <Link to="/">Privacy Policy</Link>
                        <Link to="/">Terms and Conditions</Link>

                    </Col>
                    <Col className={classes.col} lg={3} md={6}>
                        <h3 className={classes.secHeader}>ABOUT US</h3>
                        <div className={classes.rule}></div>
                        <Link to="/">Help Cemter</Link>
                        <Link to="/">Store Locations</Link>
                        <Link to="/">We Deliver Everywhere in Nigeria</Link>
                    </Col>
                    <Col className={classes.col} lg={3} md={6}>
                        <h3 className={classes.secHeader}>Categories</h3>
                        <div className={classes.rule}></div>
                        <Link to="/">Joggers</Link>
                        <Link to="/">Hoodies</Link>
                        <Link to="/">T-Shirts</Link>
                        <Link to="/">Others</Link>
                    </Col>
                    <Col className={`${classes.col} ${classes.newsSec}`} lg={3} md={6}>
                        <h3 className={classes.secHeader}>We Send You Only The Good Stuff</h3>
                        <p>News & Updates From Renah <br />No Spam, We Promise</p>
                        <form >
                            <input type="email" placeholder="Email Address" />
                            <button>SIGN UP</button>
                        </form>
                    </Col>
                </Row>
            </Container>
            <div className={classes.fullRule}></div>
            <Container>
                <p className={classes.copyright}>Copyright RENAH. Collins Sanni</p>
            </Container>
        </div>
    );
}
 
export default Footer;
