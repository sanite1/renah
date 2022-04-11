import { Col, Row } from "react-bootstrap";
import classes from "./Cart.module.css";
import { ImCancelCircle } from "react-icons/im"
import { FaMinus, FaPlus } from "react-icons/fa"
import { useEffect, useState } from "react";
import CardList from "./CardList";
import { Link } from "react-router-dom"


const Cart = () => {
    
    // const[ refetch, setRefetch ] = useState(false);
    const [isPending, setISPending] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [ subTotal, setSubTotal] = useState(0);
    // const [ qty, setqty] = useState(0);
    
    const getData = () => {
        setTimeout(() => {
            const aborter = new AbortController();
            fetch("http://localhost:5000/products", { signal: aborter.signal })
                .then((res) => {
                    if (!res.ok) {
                        throw Error("Failed to fetch data!");
                    }
                    return res.json()
                })
                .then((data) => {
                    setData(data);
                    setISPending(false);
                    setError(null);
                    let total = 0;
                    for(var i = 0; i < data.length; i++) {
                        
                        total += data[i].productPrice * data[i].quantity;
                        setSubTotal(total);
                        
                        // console.log(subTotal)
                    }
                    if(data.length === 0) {
                        setSubTotal(0);
                    }
                })
                .catch((err) => {
                    if (err.name === "AbortError") {
                        console.log("Error aborted");
                    } else {
                        setError(err.message);
                        setISPending(false);
                    }
                    
                })
        }, 2000);
            
    }    
    
    useEffect(() => {

        getData()
        
    }, [data])

    const onDelete = (id) => {
        setTimeout(() => {
            fetch("http://localhost:5000/products/" + id, {
                method: "DELETE"
            })
            .then((res) => {
                getData()
                // findTotal();
                console.log(`${id} was deleted \n `)
            })
        }, 1000)
        
    }

    // const onIncreaseClick = () => {
    //     const newAmt = qty + 1;
    //     setqty(newAmt)
    // }

    // const onDecreaseClick = () => {
    //     const newAmt = qty - 1;
    //     setqty(newAmt)
    // }

    const loadedItems = isPending ? <div className="">Loading</div> : error ? <div className="">{error}</div> : 
    data.map((item) => {

        return (
            <div key={item.id}>
                <Row className={classes.loadedItems}>
                    <Col lg={11}>
                        <Row className={classes.itemRow}>
                            <Col lg={6}>
                                <div className={classes.itemCol}>
                                    <Link to={`/products/${item.parentId}`}>
                                    <img src={item.productImg} alt="" />
                                    </Link>
                                    <div className="">
                                        {item.productName}
                                        <p>Size: {item.size}</p>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={2}>
                                <div className={classes.itemCol}>
                                    { `N${item.productPrice}` }
                                </div>
                            </Col>
                            <Col lg={2}>
                                <div className={classes.itemCol}>
                                    <FaMinus className={classes.qtyIcon} /> {item.quantity} <FaPlus className={classes.qtyIcon} />
                                </div>
                            </Col>
                            <Col lg={2}>
                                <div className={classes.itemCol}>
                                    { `N${item.quantity*item.productPrice}` }
                                    
                                </div> 
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={1}>
                        <div className={classes.delBtn} onClick={() => onDelete(item.id)}><ImCancelCircle /></div>
                    </Col>
                </Row>
                <div className={classes.spaceBetweenRows}></div>
                
                
            </div>
            
        )
    })

    return (  
        <div className={classes.wrapper0}>
            <div className={classes.wrapper}>
                <Row>
                    <Col md={8} sm={12} className={classes.mainWrapper}>
                        <Row>
                            <Col lg={11}>
                                <Row className={classes.headersWrapper}>
                                    <Col lg={6}>
                                        <p className={classes.headers}>PRODUCTS</p>
                                    </Col>
                                    <Col lg={2}>
                                        <p className={classes.headers}>PRICE</p>
                                    </Col>
                                    <Col lg={2}>
                                        <p className={classes.headers}>QTY</p>
                                    </Col>
                                    <Col lg={2}>
                                        <p className={classes.headers}>SUB-TOTAL</p> 
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        
                        {loadedItems}

                        <Row>
                            <Col lg={11}>
                                <Row className={classes.headersWrapper}>
                                    <Col lg={6}>
                                        
                                    </Col>
                                    <Col lg={2}>
                                        
                                    </Col>
                                    <Col lg={2}>
                                        <p className={classes.headers}>TOTAL: </p>
                                    </Col>
                                    <Col lg={2}>
                                        <p className={classes.headers}>{ `N${subTotal}` }</p> 
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <p className={classes.shippingInfo}>Shipping and delivery fee will be calculated at checkout.</p>
                    </Col>
                    <Col md={4} sm={12} className={classes.sec2}>
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
    );
}
 
export default Cart;