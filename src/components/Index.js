import React from 'react';
import ProductsList from "./ProductsList"
import PropTypes from 'prop-types';

const Index = ({ products, addToCart, removeFromCart, sendToCart, loading }) => {

    return (
        <div class="d-flex justfiy-content-center content">
            <ProductsList
                products={products}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                sendToCart={sendToCart}
                loading={loading}
            />
        </div>
    )
}

Index.propTypes = {
    products: PropTypes.array,
    addToCart: PropTypes.func
};

export default Index;
