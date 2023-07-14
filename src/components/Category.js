import React, { useEffect, useState } from 'react';
import ProductsList from "./ProductsList"
import PropTypes from 'prop-types';

import commerce from './Commerce';

import { useParams } from "react-router-dom";

const Category = ({ addToCart, removeFromCart, sendToCart, loading }) => {

    let params = useParams();
    const [catName, setCatName] = useState("");
    const [products, setProducts] = useState("[]");
    useEffect(() => {
        commerce.categories.retrieve(params.categorySlug, {type: 'slug'}).then((response) => {
            setCatName(response.name);
        }).catch(error => {
            setCatName("This page does not exist.");
        });
        commerce.products.list({category_slug: params.categorySlug}).then((response) => {
            if ("data" in response) {
                setProducts(JSON.stringify(response.data));
            }
        }).catch(error => {});
    }, []);

    return (
        <>
            <div class="d-flex justfiy-content-center content content-header">
                <h5>{catName}</h5>
            </div>
            <div class="d-flex justfiy-content-center content content-body">
                <ProductsList
                    products={JSON.parse(products)}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                    sendToCart={sendToCart}
                    loading={loading}
                />
        </div>
        </>
        
    )
}

Category.propTypes = {
    products: PropTypes.array,
    addToCart: PropTypes.func
};

export default Category;