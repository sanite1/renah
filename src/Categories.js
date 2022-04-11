import classes from "./Categories.module.css";
import useFetch from "./useFetch";
import { Link } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
// import { useParams } from "react-router-dom";
import { useState } from "react";

const Categories = () => {
    
    const [, setpostPending] = useState(true)
    const {data: cards, isPending, error} = useFetch("http://localhost:8000/products")

    const loadedCard = isPending ? <div>Loading...</div> : error ?
    <div className="">{error}</div> :
    <Row >
        {cards.map((item, pos) => {

            return (
                <Col lg={3} md={6} sm={6} xs={6}className={classes.card} key={item.id}>
                    <div className="">
                        <Link to={`/products/${item.id}`}>
                            <img className={classes.proImg} src={item.productImg} alt="Product Pic" />
                        </Link>
                    </div>
                   
                    <p>{item.productName}</p>
                    <p>{item.productPrice}</p>
                    <button className={classes.cartBtn} onClick={() => onAddToCartClick(pos)}>ADD TO CART</button>
                </Col>
            );
        })}
    </Row>

    const onAddToCartClick = (pos) => {

        const cartDetails = {
            productImg: cards[pos].productImg,
            productName: cards[pos].productName,
            productPrice: cards[pos].productPrice,
            quantity: 1,
            size: "L",
            parentId: cards[pos].id     
        }

        setTimeout(() => {
            fetch("http://localhost:5000/products", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(cartDetails)
            })
            .then (() => {
                setpostPending(false)
                // // history.go(-1);
                // history.push("/")
            })
        }, 1000)
    }

    return (  
        <div className={classes.outerWrapper}>
            <div className={classes.wrapper}>
                <div className={classes.txtPart}>
                    <h3 className={classes.header}>TOP SELLING</h3>
                </div>
                <div className={classes.cards}>
                    { loadedCard }

                </div>
            </div>
        </div>
    );
}
 
export default Categories;