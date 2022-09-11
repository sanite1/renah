import classes from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { FaSearch, FaUserCheck } from "react-icons/fa";
import { TiDelete } from "react-icons/ti"
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa"
import { FiMenu } from "react-icons/fi"
import api from "../api/api"
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import AccountMenu from "./MiniComponents/ProfileDropdown";
import * as React from 'react';
import {useNavigate} from "react-router-dom"
// import PersonAdd from '@mui/icons-material/PersonAdd';
// import Settings from '@mui/icons-material/Settings';
// import Logout from '@mui/icons-material/Logout';

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isLaptop, setIsLaptop] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isSearch2, setIsSearch2] = useState(false);
    const [cartData, setCartData] = useState(null);
    const [productData, setProductData] = useState(null);
    const [query, setQuery] = useState("")
    const [searchVal, setSearchVal] = useState("")
    const [isLoginedIn, setisLoginedIn] = useState(false)
    const [cartIsPending, setCartISPending] = useState(true);
    const [productIsLoading, setProductIsLoading] = useState(true);

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
            setCartData(response.data)
            setCartISPending(false)
        } catch(err) {
            if(err.response) {
                console.log("Error: " + err.response);
            }
        }
    }

    const getProductData = async () => {
        try {
            const response = await api.get("/api/products")
            setProductData(response.data)
            setProductIsLoading(false)
        } catch(err) {
            if(err.response) {
                console.log("Error: " + err.response);
            }
        }
    }

    const onCancelSearchClick = () => {
        setQuery("");
        console.log(searchVal)
        setIsSearch2(false)
    }
    const onSearch2Click = () => {
        setIsSearch2(!isSearch2);
    }
    let searchItems;
    if(query !== "") {
        searchItems = productIsLoading ? [] : productData.data.filter(post => { 
            let filteredItems;
            if (query === '') { 
                filteredItems = post; 
            } else if (post.productName.toLowerCase().includes(query.toLowerCase())) { 
                filteredItems = post; 
            } 
            return filteredItems;
        }).map((post, index) => { 
            
            return(
                <div className={classes.searchedBox} key={index}> 

                    <Link className={classes.itemLink} to={`/products/${post._id}`} onClick={() => onCancelSearchClick(post.productName)} >{post.productName}</Link> 
                    {/* <p>{post.author}</p>  */}
                </div> 
    
            )
        
        }) 
    }

    const searchBar2 = <div className={classes.searchBar2}>
        <form>
            <input placeholder="Search for items, products and inspiriations..." value={query} onChange={event => setQuery(event.target.value)} /> 
            <FaSearch  className={classes.icon1} />
            <TiDelete  className={classes.icon2} onClick={onCancelSearchClick}  />
        </form>
        <div className={classes.searchItems}>
            {searchItems}
        </div>
        
    </div>
    
    
    useEffect(() => {
        getProductData()
        getCartData()
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        if (user) {
         setisLoginedIn(true)
        }
      }, [user]);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logout = async () => {
        try {
            const response = await api.post("/api/logout")
            if(response.data.success){

                console.log("Success");
                console.log(response.data);
                localStorage.setItem('user', JSON.stringify(response.data.data));
                // navigate('/')
                window.location.reload();
                // navigate.push("/login")
            }else{
                // seterrorMessage(response.data.err.message);
            }
        } catch(err) {
            if(err.response) {
                console.log(err.response);
                // seterrorMessage(err.response);   
            }
        }
        console.log("Logout");
    }
    

    const loggedin = <span className={`${classes.loggedinWrapper} ${classes.linkItem}`}>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }} onClick={handleClick}>
        <FaUserAlt /> HI, {user?.fullName.split(" ")[0]}
        <React.Fragment>
        <Menu
            // anchorOrigin={{
            //     vertical: "top",
            //     horizontal: "right",
            // }}
            // keepMounted
            // transformOrigin={{
            //     vertical: "top",
            //     horizontal: "right",
            // }}
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            // onClick={handleClose}
            PaperProps={{
            elevation: 0,
            sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
                },
                '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
                },
            },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem>
            <Avatar /> Profile
            </MenuItem>
            <MenuItem>
            <Avatar /> My account
            </MenuItem>
            <Divider />
            {/* <MenuItem>
            <ListItemIcon>
                <PersonAdd fontSize="small" />
            </ListItemIcon>
            Add another account
            </MenuItem> */}
            <MenuItem>
            <ListItemIcon>
                {/* <Settings fontSize="small" /> */}
            </ListItemIcon>
            Settings
            </MenuItem>
            <MenuItem onClick={() => logout()}>
            <ListItemIcon>
                {/* <Logout fontSize="small" /> */}
            </ListItemIcon>
            Logout
            </MenuItem>
        </Menu>
        </React.Fragment>
      </Box>
    </span>

    const forNavLaptop = <div className={classes.links}>
        <Link to="/categories/All" className={classes.linkItem}>Categories</Link>
        {
            isLoginedIn ? loggedin :
            <Link to="/login" className={classes.linkItem}>Login / Sign up</Link>
        }
        <Link to="/cart" className={classes.linkItem}> <AiOutlineShoppingCart className={classes.cartIcon}/> Cart: {cartIsPending ? "" : cartData.data.length}</Link>
    </div>
    const forNavTablet = <div className={classes.iconLinks}>
        <FaSearch onClick={onSearch2Click}  className={classes.iconItem} size={isTablet ? 25 : 20} />
        <Link to="/login" className={classes.iconItem}>
            {
                isLoginedIn ? <FaUserCheck size={isTablet ? 30 : 25} /> :
                <FaUserAlt size={isTablet ? 30 : 25} />
            } 
        </Link>
        <Link to="/cart" className={classes.iconItem}> <AiOutlineShoppingCart size={isTablet ? 30 : 25} className={classes.iconCart}/> <span className={classes.cartAmt}>{cartIsPending ? "" : cartData.data.length}</span></Link>
        <Link to="/categories/All" className={classes.iconItem}><FiMenu size={isTablet ? 30 : 25} /></Link>
    </div>

    return ( 
        <nav className={classes.navbarWrapper00}>
            <div className={classes.navbarWrapper}>
                <div className="">
                    <Link to="/" className={classes.brandName}>RENAH</Link>
                </div>
                <div className={classes.searchBar1}>
                    <form>
                        <input placeholder="Search for items, products and inspiriations..." value={query} onChange={event => setQuery(event.target.value)} />
                        <FaSearch  className={classes.icon1} />
                        <TiDelete  className={classes.icon2} onClick={onCancelSearchClick}  />
                    </form>
                    <div className={classes.searchItems}>
                        {searchItems}
                    </div>
                
                </div>
                <div className={classes.linksWrapper}>
                    { isLaptop ? forNavLaptop : <></>}
                    { isTablet ? forNavTablet : <></>}
                    { isMobile ? forNavTablet : <></>}
                </div>
            </div>
            { isSearch2 ? searchBar2 : null}
        </nav>

    );
}
 
export default Navbar;