import React from "react";
import PropTypes from 'prop-types';
const { stripHtml } = require("string-strip-html");

const ProductItem = ({ product, addToCart, removeFromCart, sendToCart, loading }) => {

  const { result } = stripHtml(product.description);

  return (
    <div class="card product_card">
      <img style={{height: "18em"}} src={product.image?.url} class="card-img-top" alt={product.name} />
      <div class="card-body">
        <h5 class="card-title">{product.name}</h5>
        <p class="card-text">{result}</p>
        <p class="card-text">{product.price.formatted_with_symbol}</p>
        <div class="row">
          <div class="col">
            <div class="btn-group" role="group" aria-label="First group">
              <button onClick={() => removeFromCart(product.id)} type="button" class="btn btn-secondary">-</button>
              <div class="form-control" id="btnGroupAddon" style={{borderRadius: 0}}><span id={"item-" + product.id}>0</span></div>
              <button onClick={() => addToCart(product.id)} type="button" class="btn btn-secondary">+</button>
            </div>
          </div>
          <div class="col">
            <button id={"item-button-" + product.id} onClick={() => sendToCart(product.id)} type="button" class="btn btn-primary addcart-btn">
            { loading.includes(product.id) ? (<div class="spinner-border spinner-border-sm" role='status'></div>) : ("Add to Cart") }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object,
  addToCart: PropTypes.func
};

export default ProductItem;