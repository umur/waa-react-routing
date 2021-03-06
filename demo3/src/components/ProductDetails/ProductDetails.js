import axios from "axios";
import { useEffect, useState, Fragment, useCallback, useMemo, useRef } from "react";
import { useParams } from "react-router";
import Review from "../Review/Review";
import './ProductDetails.css';

const ProductDetails = (props) => {

    const params = useParams();

    const [productDetail, setProductDetail] = useState({});


    useEffect(
        () => {
            console.log(params.id)
            if (params.id) {
                axios.get('http://localhost:8080/api/v1/products/' + params.id + '/reviews')
                    .then(response => {
                        setProductDetail(response.data)
                    })
                    .catch(err => console.log(err.message))
            }
        }, [params.id])



    const space = <Fragment>&nbsp;&nbsp;</Fragment>;

    let productDetailsDisplay = null;
    if (params.id) {

        productDetailsDisplay = (

            <div className="ProductDetail">
                <div>
                    Product Details
                </div>
                <h1> {productDetail.name}</h1>
                <div >
                    {productDetail.price}
                    <br />

                    <div style={{ textAlign: "left" }}>
                        {space} Reviews <br />
                        {productDetail.reviews != null ? productDetail.reviews.map(review => {
                            return <Review comment={review.comment} />
                        }) : null}
                    </div>
                </div>
            </div>
        );
    }

    return productDetailsDisplay



}

export default ProductDetails;