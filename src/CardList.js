import { useEffect, useState } from "react";
import classes from "./CardList.module.css";
import useFetch from "./useFetch"
import { Link } from "react-router-dom"
// import { useParams } from "react-router-dom";

const CardList = (props) => {
    const [, setpostPending] = useState(true);
    const [loadedCart, setLoadedCart] = useState();
    const [isInCart, setisInCart] = useState(false);

    const [isPending2, setISPending2] = useState(true);
    const [data2, setData2] = useState(null);
    const [error2, setError2] = useState(null);
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
                    setData2(data);
                    setISPending2(false);
                    setError2(null);
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
                        setError2(err.message);
                        setISPending2(false);
                    }
                    
                })
        }, 2000);
            
    } 


    

    
    const { data: cards, isPending, error} = useFetch("http://localhost:8000/products")


    // const { id } = useParams();
    
    useEffect(() => {
        
        getData();

    }, [data2]);

    const loadedCard = isPending ? <div>Loading...</div> : error ?
    <div className="">{error}</div> :
    cards.map((item, pos) => {

        return (
            <div key={item.id} className={classes.card}>
                <Link className={classes.proImg} to={`/products/${item.id}`}  >
                    <img  src={item.productImg} alt="Product Pic" />
                </Link>
                <p>{item.productName}</p>
                <p>{item.productPrice}</p>
                <button className={classes.cartBtn} onClick={() => onAddToCartClick(pos)} >ADD TO CART</button>
            </div>
            
        );
    })

    

    const onAddToCartClick = (pos) => {

        const cartDetails = {
            productImg: cards[pos].productImg,
            productName: cards[pos].productName,
            productPrice: cards[pos].productPrice,
            quantity: 1,
            size: "L",
            parentId: cards[pos].id
        
        }

        console.log(data2);

        if( data2.length === 0) {
            setTimeout(() => {
                fetch("http://localhost:5000/products", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(cartDetails)
                })
                .then (() => {
                    setpostPending(false);
                    getData();
                    console.log(data2);
                })
            }, 100)
        }else {
            let cartVar = data2.some(code=>code.parentId===cards[pos].id);

            if(cartVar === true) {
                setisInCart(true)
            } else {
                setisInCart(false)
            }

            if(isInCart === true) {
                console.log("Is in cart")
            } else {
                setTimeout(() => {
                    fetch("http://localhost:5000/products", {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(cartDetails)
                    })
                    .then (() => {
                        setpostPending(false);
                        getData();
                        console.log(data2);
                    })
                }, 100)
            }
        }

        // loadedCart === [] ? setTimeout(() => {
        //     fetch("http://localhost:5000/products", {
        //         method: "POST",
        //         headers: {"Content-Type": "application/json"},
        //         body: JSON.stringify(cartDetails)
        //     })
        //     .then (() => {
        //         setpostPending(false)
        //         console.log(loadedCart);
                
        //         // // history.go(-1);
        //         // history.push("/")
        //     })
        // }, 100) : setisInCart(loadedCart.some(code=>code.parentId===cards[pos].id))

        

        // let cartVar = loadedCart.some(code=>code.parentId===cards[pos].id);

        // setisInCart(loadedCart.some(code=>code.parentId===cards[pos].id))

        // console.log(isInCart);

        // isInCart ? console.log("Is in Card") : setTimeout(() => {
        //     fetch("http://localhost:5000/products", {
        //         method: "POST",
        //         headers: {"Content-Type": "application/json"},
        //         body: JSON.stringify(cartDetails)
        //     })
        //     .then (() => {
        //         setpostPending(false)
                
        //         // // history.go(-1);
        //         // history.push("/")
        //     })
        // }, 100)
        

        

            
        
        
    }
    
    return (
        <div className={classes.cards}>
            { loadedCard }
        </div>
    );
}


export default CardList;


















// console.log(`Card position: ${cards[pos].id}\n Cart Parent ID: ${loadedCart[j].parentId}\n Cart ID: ${loadedCart[j].id}`);
        // setDelId(loadedCart[j].id)

        // loadedCart.forEach(element => {
        //     console.log("For each Loop" + element.id);
        // });

        // for(let j = 0; j < loadedCart.length; j++) {
        //     console.log(`Loop ${j+1} of ${loadedCart.length}`);
        //     if(cards[pos].id === loadedCart[j].parentId){
                
        //         // delRequest(loadedCart[j].id);
        //         console.log("Item is already in cart!!");
        //         setIsInCart()

        //     }
        //     else {
        //         setTimeout(() => {
        //             fetch("http://localhost:5000/products", {
        //                 method: "POST",
        //                 headers: {"Content-Type": "application/json"},
        //                 body: JSON.stringify(cartDetails)
        //             })
        //             .then (() => {
        //                 setpostPending(false)
                        
        //                 // // history.go(-1);
        //                 // history.push("/")
        //             })
        //         }, 100)
        //     }
        // }    