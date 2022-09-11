import React, { useEffect, useState } from "react";
import classes from "./ProductPreview.module.css";
// import ProductDescriptionData from "./ProductDescriptionData";
import { Container, Row, Col } from "react-bootstrap";
import { FaAngleDown, FaAngleUp} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import CardList from "./CardList";
import { Link } from "react-router-dom";
import useAddToCart from "../AddToCart";
import Navbar from "./Navbar";
import api from "../api/api"
import Footer from "./Footer";

const PreviewPreview = () => {

    const [currentPreviewImg, setcurrentPreviewImg] = useState(0);
    const [currentOption, setcurrentOption] = useState(0);
    const [amount, setAmount] = useState(1);
    const [size, setSize] = useState("L");
    const [data, setData] = useState([]);
    const [isLoading, setISloading] = useState(true);

    const { id } = useParams();

    const onAddToCartClick = useAddToCart(amount, size)


    const onImgOptionClick = (pos) => {
        console.log(pos);
        setcurrentPreviewImg(pos);
    }

    const onIncreaseClick = () => {
        const newAmt = amount + 1;
        setAmount(newAmt)
    }

    const onDecreaseClick = () => {
        const newAmt = amount - 1;
        setAmount(newAmt)
    }

    const onSizeClick = (size) => {
        setSize(size);
    }

    const sizeList = ["XS", "S", "M","L", "XL"];

    const mappedSizes = sizeList.map((item, pos) => {
        const sizeClassArr = [classes.sizeItems];
        if (item === size) {
            sizeClassArr.push(classes.selectedSize);
        }
        return(
            <span key={pos} className={sizeClassArr.join(" ")} onClick={() => {onSizeClick(item)}} >{item}</span>
                
        );

        
    }) 
    
    const onOptionClick = (pos) => {
        console.log(pos);
        setcurrentOption(pos)
    }

    const options = ["Overview", "Description", "Policy", "Feedback"];

    const currentOpt = options[currentOption];

    const options1 = options.map((item, pos) => {
        const classArr = [classes.optionItem];
        if (pos === currentOption) {
            classArr.push(classes.selectedOpt);
        }
        return (
            <span key={pos} className={classArr.join(" ")} onClick={() => {onOptionClick(pos)}}>{item}</span>
        );
    });

    const getData = async () => {
        try {
            const response = await api.get("/api/products/" + id)
            setData(response.data)
            setISloading(false)
        } catch(err) {
            if(err.response) {
                console.log("Error: " + err.response);
            }
        }
    }

    useEffect(() => {
        getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (  
        <div className="">
            <Navbar />
            <div className={classes.wrapper}>
                {
                    isLoading ? <p>Loading</p> :
                    <div className="">
                        <div className={classes.previewWrapper}>
                            <Row className={classes.rowWrapper}>
                                <Col lg={6} md={12} >
                                    <Row className={classes.wrapper1}>
                                        <Col lg={12} md={8}>
                                            <img className={classes.mainImg} src={data.data[0].otherImgs[currentPreviewImg].img} alt="Product Img" />
                                        </Col>
                                        <Col lg={12} md={4} className={classes.imgOptions}>
                                            {
                                                data.data[0].otherImgs.map((item, pos) => {
                                                    const classArr = [classes.otherImgs];
                                                    if (pos === currentPreviewImg) {
                                                        classArr.push(classes.selectedImg);
                                                    }
                                                    return(
                                                        <img key={pos} className={classArr.join(" ")} onClick={() => {onImgOptionClick(pos)}} src={item.img} alt="Img" />
                                                    );
                                                })
                                            }
                                        </Col>
                                    </Row>
                                    
                                </Col>
                                <Col lg={6} md={12} >
                                    <div className={classes.wrapper2}>
                                        <h2 className={classes.title}>{data.data[0].productName}</h2>
                                        <p className={classes.stars}>
                                            {
                                                (data.data[0].rating === 5) ?
                                                    <div className=""><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /></div> :
                                                (data.data[0].rating === 4) ?
                                                    <div className=""><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /><AiOutlineStar /></div> :
                                                (data.data[0].rating === 3) ?
                                                    <div className=""><AiFillStar /><AiFillStar /><AiFillStar /><AiOutlineStar /><AiOutlineStar /></div> :
                                                (data.data[0].rating === 2) ?
                                                    <div className=""><AiFillStar /><AiFillStar /><AiOutlineStar /><AiOutlineStar /><AiOutlineStar /></div> :
                                                (data.data[0].rating === 1) ?
                                                    <div className=""><AiFillStar /><AiOutlineStar /><AiOutlineStar /><AiOutlineStar /><AiOutlineStar /></div> : ""
                                                
                                            }
                                        </p>
                                        <h3 className={classes.price}>{data.data[0].productPrice}</h3>
                                        <hr/>
                                        <p className={classes.extraText}>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent suscipit ligula vel luctus molestie.
                                        </p>
                                        <hr/>
                                        <div className={classes.amtWrapper1}>
                                            <div className={classes.amt}>{amount}</div>
                                            <FaAngleUp className={classes.amtIcon1} onClick={onIncreaseClick}/>
                                            <FaAngleDown className={classes.amtIcon2} onClick={onDecreaseClick}/>
                                        </div>
                                        <button className={classes.cartBtn} onClick={() => onAddToCartClick(data.data[0])}>ADD TO CART</button>
                                        <p className={classes.extraText}>Select Size:</p>
                                        <div className={classes.sizesWrapper}>
                                            {mappedSizes}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <Container >
                            <div className={classes.descWrapper2}>
                                <div className={classes.options}>
                                    {options1}
                                </div>
                                <div className={classes.optDesc}>
                                    <h3 className={classes.title}>{currentOpt}</h3>
                                    <p>
                                        {
                                            (currentOpt === "Overview" && data.data[0].Overview === "") ?
                                            "No " + currentOpt + " available for this item." :
                                            (currentOpt === "Description" && data.data[0].Description === "") ?
                                            "No " + currentOpt + " available for this item." :
                                            (currentOpt === "Policy" && data.data[0].Policy === "") ?
                                            "No " + currentOpt + " available for this item." :
                                            (currentOpt === "Feedback" && data.data[0].Feedback === "") ?
                                            "No " + currentOpt + " available for this item." : ""
                                            
                                        }
                                    </p>
                                </div>
                            </div>
                            {/* Last Viewed Section */}
                            <section>
                                <div className={classes.topSellingWrapper}>
                                    <div className={classes.txtPart}>
                                        <h3 className={classes.header}>RECENTLY VIEWED</h3>
                                        <Link  to="/" className={classes.seeAll}>SEE ALL</Link>
                                    </div>
                                    <div className={classes.cards}>
                                        <CardList />
                                    </div>
                                </div>
                            </section>
                        </Container>
                    </div>
                }
            </div>
            <Footer />
        </div>
    );
}
 
export default PreviewPreview;
