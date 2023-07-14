import React from 'react';
import CartProduct from './CartProduct'

const CartList = ({ sentCart, deleteFromCart }) => {

    return (
        <div class="list-group">
            { JSON.parse(sentCart).map((product) => (
                <>
                    <CartProduct 
                        product={product}
                        deleteFromCart={deleteFromCart}
                    />
                    <br />
                </>
            ))}
        </div>
    )
}

export default CartList;