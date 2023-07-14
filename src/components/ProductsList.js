import React from 'react';
import PropTypes from 'prop-types';
import ProductItem from './ProductItem';

const ProductsList = ({ products, addToCart, removeFromCart, sendToCart, loading }) => {

    return (
        <div class="row justify-content-center" id="products">
            { products.map((product) => (
                <div class="col">
                <ProductItem
                    product={product}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                    sendToCart={sendToCart}
                    loading={loading}
                />
                </div>
            ))}
        </div>
    );
};

ProductsList.propTypes = {
    products: PropTypes.array,
    addToCart: PropTypes.func
};

export default ProductsList;