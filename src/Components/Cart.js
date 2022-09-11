import { Col, Row } from "react-bootstrap";
import classes from "./Cart.module.css";
import { ImCancelCircle } from "react-icons/im"
import { FaMinus, FaPlus } from "react-icons/fa"
import { useEffect, useState } from "react";
import CardList from "./CardList";
import { Link } from "react-router-dom"
import Navbar from "./Navbar";
import Footer from "./Footer";
import api from "../api/api"


const Cart = () => {
    
    const [isMobile, setIsMobile] = useState(false);
    const [isLaptop, setIsLaptop] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    
    const [cartIsPending, setCartISPending] = useState(true);
    const [data, setData] = useState(null);
    const [ subTotal, setSubTotal] = useState(0);
    
    useEffect(() => {
        setIsMobile(window.innerWidth <= 480 ? true : false);
        setIsTablet(window.innerWidth <= 990 && window.innerWidth > 480 ? true : false);
        setIsLaptop(window.innerWidth > 990 ? true : false);
        console.log(isLaptop, isMobile, isTablet);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLaptop, isMobile, isTablet, window.innerWidth])

    const getCartData = async () => {
        try {
            const response = await api.get("/api/cart")
            setData(response.data)
            setCartISPending(false)
            let total = 0;
            for(var i = 0; i < data.data.length; i++) {
                
                total += data.data[i].productPrice * data.data[i].quantity;
                
            }
            setSubTotal(total);
            if(data.length === 0) {
                setSubTotal(0);
            }
        } catch(err) {
            if(err.response) {
                console.log("Error: " + err.response);
            }
        }
    }    
    
    useEffect(() => {

        getCartData();
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onDelete = async (id) => {
        console.log(id);
        try {
            const response = await api.delete("/api/cart/" + id)
            console.log("Item deleted");
            getCartData()
            return response.data
        } catch(err) {
            if(err.response) {
                console.log("Error: " + err.response);
            }
        }
    }

    const onIncreaseClick = async (id) => {
        try {
            const response = await api.patch("/api/cart", {id, op: "+"})
            console.log("Me2");
            getCartData()
            return response.data
        } catch(err) {
            if(err.response) {
                console.log("Error: " + err.response);
            }
        }
    }

    const onDecreaseClick = async (id) => {
        try {
            const response = await api.patch("/api/cart", {id, op: "-"})
            console.log("Me2");
            getCartData()
            return response.data
        } catch(err) {
            if(err.response) {
                console.log("Error: " + err.response);
            }
        }
    }

    const loadedItems = cartIsPending ? <div className="">Loading</div> : 
    data.data.map((item) => {

        return (
            <div key={item.id}>
                <Row className={classes.loadedItems}>
                    <Col lg={11} md={11} sm={11}  xs={11}>
                        <Row className={classes.itemRow}>
                            <Col lg={8} md={8} sm={8} xs={8}>
                                <Row className={classes.side1}>
                                    <Col lg={9} md={9} sm={9} xs={9}>
                                        {/* <div className={classes.itemCol}> */}
                                            <Row>
                                                <Col lg={3} md={3} sm={12} xs={12}>
                                                    <div className={classes.itemCol}>
                                                        <Link to={`/products/${item.parentId}`}>
                                                        <img src={item.productImg} alt="" />
                                                        </Link>

                                                    </div>
                                                </Col>
                                                <Col lg={9} md={9} sm={12} xs={12}>
                                                    <div className={classes.productName}>
                                                        {item.productName}
                                                        <p>Size: {item.size}</p>
                                                    </div>
                                                
                                                </Col>
                                            </Row>
                                        {/* </div> */}
                                    </Col>
                                    <Col lg={3} md={3} sm={12} xs={12}>
                                        <div className={classes.itemCol}>
                                            { `N${item.productPrice}` }
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            
                            <Col lg={4} md={4} sm={4} xs={4}>
                                <Row>
                                    <Col lg={6} md={6} sm={6} xs={6}>
                                        <div className={classes.itemCol}>
                                            <FaMinus className={classes.qtyIcon} onClick={() => onDecreaseClick(item._id)} /> {item.quantity} <FaPlus className={classes.qtyIcon} onClick={() => onIncreaseClick(item._id)} />
                                        </div>
                                    </Col>
                                    <Col lg={6} md={6} sm={6} xs={6}>
                                        <div className={classes.itemCol}>
                                            { `N${item.quantity*item.productPrice}` }
                                            
                                        </div> 
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={1} md={1} sm={1} xs={1}>
                        <div className={classes.delBtn} onClick={() => onDelete(item._id)}><ImCancelCircle /></div>
                    </Col>
                </Row>
                <div className={classes.spaceBetweenRows}></div>
                
                
            </div>
            
        )
    })

    return (  
        <div className="">
            <Navbar />
            <div className={classes.wrapper0}>
                {
                    cartIsPending ? <p>Loading</p> :
                    <div className={classes.wrapper}>
                        <Row>
                            <Col lg={8}  sm={12} className={classes.mainWrapper}>
                                <Row>
                                    <Col lg={11} md={11} sm={11} xs={11}>
                                        <Row className={classes.headersWrapper}>
                                            <Col lg={8} md={8} sm={8} xs={8}>
                                                <Row>
                                                    <Col lg={9} md={9} sm={9} xs={9}>
                                                        <p className={classes.headers}>PRODUCTS</p>
                                                    </Col>
                                                    <Col lg={3} md={3} >
                                                        <p className={classes.headers}>{isMobile ? "" : "PRICE"}</p>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col lg={4} md={4} sm={4} xs={4}>
                                                <Row>
                                                    <Col lg={6} md={6} sm={6} xs={6}>
                                                        <p className={classes.headers}>QTY</p>
                                                    </Col>
                                                    <Col lg={6} md={6} sm={6} xs={6}>
                                                    <p className={classes.headers}>SUB-TOTAL</p>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                {loadedItems}
                                <Row>
                                    <Col lg={11} md={11} sm={11} xs={11}>
                                        <Row className={classes.headersWrapper}>
                                            <Col lg={8} md={8} sm={8} xs={8}>
                                                <Row>
                                                    <Col lg={9} md={9} sm={9} xs={9}>
                                                    </Col>
                                                    <Col lg={3} md={3}>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col lg={4} md={4} sm={4} xs={4}>
                                                <Row>
                                                    <Col lg={6} md={6} sm={6} xs={6}>
                                                        <p className={classes.headers}>TOTAL: </p>
                                                    </Col>
                                                    <Col lg={6} md={6} sm={6} xs={6}>
                                                        <p className={classes.headers}>{ `N${subTotal}` }</p>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <p className={classes.shippingInfo}>Shipping and delivery fee will be calculated at checkout.</p>
                            </Col>
                            <Col lg={4} sm={12} className={classes.sec2}>
                                <form >
                                    <input type="checkbox" name="location" />
                                    <label>Delivery outside Lagos</label>
                                </form>
                                <p><span>Need Help?</span> Chat live with an expert</p>
                                <button className={classes.cartBtn}>CHECK OUT</button>
                                <button className={classes.cartBtn}>CALL TO ORDER</button>
                            </Col>
                        </Row>
                    </div>
                }
                {/* Top selling section */}
                <div className={classes.recentlyViewedWrapper}>
                    <div className={classes.txtPart}>
                        <h3 className={classes.header}>RECENTLY VIEWED</h3>
                        <Link to="/" className={classes.seeAll}>SEE ALL</Link>
                    </div>
                    <div className={classes.cards}>
                        <CardList />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
 
export default Cart;