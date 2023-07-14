import React from 'react';

const CartProduct = ({ product, deleteFromCart }) => {

    return (
        <div class="card">
            
            <div class="row" style={{padding: "0.5em"}}>
                <div class="col-lg-1" style={{width: "9em"}}>
                    <img class="mb-1 cart_thumbnail" src={product.image.url}/>
                </div>
                <div class="col-md-2" style={{width: "max-content"}}>
                    <h5 class="mb-1">{product.name}</h5>
                    <p class="mb-1">{product.price.formatted_with_symbol}</p>
                    <p class="mb-1">Qty: {product.quantity}</p>
                    <button type="button" class="btn btn-danger cart-btn" onClick={() => deleteFromCart(product.id, product.product_id)}>
                        <div class="spinner-border spinner-border-sm" id={"cart-delete-btn-load-" + product.product_id} role='status' hidden></div>
                        <span id={"cart-delete-btn-text-" + product.product_id}>Delete</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartProduct;
