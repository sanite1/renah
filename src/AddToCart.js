import { useState, useEffect } from "react";
import useFetch from "./useFetch"
import api from "./api/api"

const useAddToCart = (amount, size) => {

    const [data, setData] = useState();
    const [data2, setData2] = useState();
    const [isPending, setISPending] = useState(true);
    const [cartIsPending, setCartISPending] = useState(true);

    const getCartData = async () => {
        try {
            const response = await api.get("/api/cart")
            setData(response.data)
            setCartISPending(false)
        } catch(err) {
            if(err.response) {
                console.log("Error: " + err.response);
            }
        }
    }

    const onAddToCartClick = (productData) => {

        // console.log(data);
        const cartDetails = JSON.stringify({
            productImg: productData.productImg,
            productName: productData.productName,
            productPrice: productData.productPrice,
            quantity: amount,
            size: size,
            parentId: productData._id
            // userId: 
        })

        if( data.data.length === 0) {
            console.log("Empty cart");
            const postData = async (details) => {
                try {
                    const response = await api.post("/api/cart", details, {headers: {'Content-Type': 'application/json'}})
                    getCartData()
                } catch(err) {
                    if(err.response) {
                        console.log("Error: " + err.response);
                    }
                }
            }
            postData(cartDetails)
        } else {
            let cartVar = data.data.filter((item, pos) => {
                console.log(item.parentId);
                return item.parentId === productData._id
            })

            if(cartVar === undefined || cartVar.length === 0 || cartVar === []) {
                console.log("Not same pid");
                const postData = async (details) => {
                    try {
                        const response = await api.post("/api/cart", details, {headers: {'Content-Type': 'application/json'}})
                        getCartData()
                        console.log("Me1");
                        return response.data
                    } catch(err) {
                        if(err.response) {
                            console.log("Error: " + err.response);
                        }
                    }
                }
                postData(cartDetails)
            } else {
                console.log("Same pid");
                let sameSize = data.data.filter((item, pos) => {
                    return item.parentId === productData._id && item.size===size
                })
                
                console.log(sameSize);
                if (sameSize !== undefined || sameSize.length !== 0 || sameSize !== []) {
                    console.log("Same pid and size");
                    const deleteData = async (id) => {
                        try {
                            const response = await api.delete("/api/cart/" + id)
                            console.log("Me2");
                            getCartData()
                            return response.data
                        } catch(err) {
                            if(err.response) {
                                console.log("Error: " + err.response);
                            }
                        }
                    }
                    deleteData(sameSize._id)
                }
                console.log("Is in cart");
                const postData = async (details) => {
                    try {
                        const response = await api.post("/api/cart", details, {headers: {'Content-Type': 'application/json'}})
                        getCartData()
                        return response.data
                    } catch(err) {
                        if(err.response) {
                            console.log("Error: " + err.response);
                        }
                    }
                }
                postData(cartDetails)
            }
        }
    }

    useEffect(() => {
    
        getCartData();

    }, []);

    return onAddToCartClick;
}
 
export default useAddToCart;