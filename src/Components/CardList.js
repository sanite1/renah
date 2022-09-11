// import { useEffect, useState } from "react";
import classes from "./CardList.module.css";
import useFetch from "../useFetch"
import { Link } from "react-router-dom"
import useAddToCart from "../AddToCart";
import api from "../api/api"
import { useEffect } from "react";
import { useState } from "react";

const CardList = (props) => {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const onAddToCartClick = useAddToCart(1, "L")

    const getData = async () => {
        try {
            const response = await api.get("/api/products")
            setData(response.data)
            setIsLoading(false)
        } catch(err) {
            if(err.response) {
                console.log("Error: " + err.response);
            }
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className={classes.cards}>
            { 
                isLoading ? <p>Loading</p> : data.data.map((item, pos) => {
                    
                    return(
                        <div key={item._id} className={classes.card}>
                            <Link className={classes.proImg} to={`/products/${item._id}`}  >
                                <img  src={item.productImg} alt="Product Pic" />
                            </Link>
                            <p className={classes.pName}>{item.productName}</p>
                            <p>N {item.productPrice}</p>
                            <button className={classes.cartBtn} onClick={() => onAddToCartClick(item)} >ADD TO CART</button>
                        </div>

                    )
                })
            }
        </div> 
    );
}

export default CardList;
