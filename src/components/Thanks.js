import React from 'react';

const Thanks = () => {

    return (
        <div class="content">
            <h5>Thanks for purchasing our product.</h5>
            <p>Your reference number is: { localStorage.getItem("orderno") }</p>
        </div>
    )
}

export default Thanks;
