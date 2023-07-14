import React from 'react';
import CartList from './CartList';

const Cart = ({ sentCart, checkoutStart, loadCart, deleteFromCart }) => {

    const renderCart = (loadCart) => {
        switch (loadCart) {
            case "load":
                return (
                    <div class="alert alert-secondary" role="alert">Loading...</div>
                );

            case "show":
                return (
                    <>
                        <CartList sentCart={sentCart} deleteFromCart={deleteFromCart} />
                        <br />
                        <button id="go-checkout-btn" onClick={checkoutStart} class="btn btn-primary cart-btn">
                            <div class="spinner-border spinner-border-sm" id="go-checkout-btn-load" role='status' hidden></div>
                            <span id="go-checkout-btn-text">Checkout</span>
                        </button>
                    </>
                );

            default:
                return (
                    <div class="alert alert-secondary" role="alert">You have no items in your cart.</div>
                )
        }
    }

    return (
        <div class="content">
            { renderCart(loadCart) }
        </div>
    )
}

export default Cart;