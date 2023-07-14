import React from 'react';
import CheckoutDetails from './CheckoutDetails'

const Checkout = ({ finishCheckout, errorCheckout }) => {

    return (
        <div class="content">
        <CheckoutDetails 
            finishCheckout={finishCheckout}
            errorCheckout={errorCheckout}
        />
        </div>
    )
}

export default Checkout;