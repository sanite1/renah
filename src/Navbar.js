import classes from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { TiDelete } from "react-icons/ti"
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useEffect, useState } from "react";

const Navbar = () => {
    const [isPending, setISPending] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    
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
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    })



    return ( 
        <nav className={classes.navbarWrapper}>
            <Link to="/" className={classes.brandName}>RENAH</Link>
            <div className={classes.searchBar}>
                <form>
                    <input type="search" placeholder="Search for items, products and inspiriations..." />
                    <FaSearch  className={classes.icon1} />
                    <TiDelete  className={classes.icon2} />
                </form>
                
            </div>
            <div className={classes.links}>
                <Link to="/categories" className={classes.linkItem}>Categories</Link>
                <Link to="/login" className={classes.linkItem}>Login / Sign up</Link>
                <Link to="/cart" className={classes.linkItem}> <AiOutlineShoppingCart className={classes.cartIcon}/> Cart: {isPending ? "" : error ? "" : data.length}</Link>
            </div>
        </nav>
    );
}
 
export default Navbar;