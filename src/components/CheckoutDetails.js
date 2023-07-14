import React, { useState, useEffect } from 'react';
import commerce from './Commerce';

const CheckoutDetails = ({ finishCheckout, errorCheckout }) => {

    const [show, setShow] = useState("load");
    useEffect(() => {
        let tokenID = localStorage.getItem("checkout");
        commerce.checkout.getToken(tokenID).then((token) => {
            if (token.cart_id === null) {
                setShow("none");
            } else {
                setShow("show");
            }

        }).catch((error) => {

            setShow("none");

        });
    }, []);

    const renderCheckout = (show) => {
        switch (show) {
            case "load":
                return (
                    <div class="alert alert-secondary" role="alert">Loading...</div>
                );

            case "show":
                return (
                    <form onSubmit={finishCheckout}>
                        <div class="row">
                            <div class="form-group col">
                                <label for="firstName">First Name</label>
                                <input type="text" class="form-control" id="firstName" placeholder="First Name" />
                            </div>
                            <div class="form-group col">
                                <label for="lastName">Last Name</label>
                                <input type="text" class="form-control" id="lastName" placeholder="Last Name" />
                            </div>
                            <div class="form-group col">
                                <label for="email">Email</label>
                                <input type="email" class="form-control" id="email" placeholder="Email" />
                            </div>
                        </div>
                        {/* <h5>Shipping</h5>
                        <div class="row">
                            <label for="shippingName">Name</label>
                            <input type="text" class="form-control" id="shippingName" placeholder="" />
                            <label for="inputAddress">Address</label>
                            <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" />
                        </div>
                        <div class="form-group">
                            <label for="inputAddress2">Address 2</label>
                            <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="inputCity">City</label>
                                <input type="text" class="form-control" id="inputCity" />
                            </div>
                            <div class="form-group col-md-4">
                                <label for="inputState">State</label>
                                <select id="inputState" class="form-control">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div class="form-group col-md-2">
                                <label for="inputZip">Zip</label>
                                <input type="text" class="form-control" id="inputZip" />
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="gridCheck" />
                                <label class="form-check-label" for="gridCheck">
                                    Check me out
                                </label>
                            </div>
                        </div> */}
                        <br />
                        <button type="submit" class="btn btn-primary" id="order-btn">
                            <div class="spinner-border spinner-border-sm" id="order-btn-load" role='status' hidden></div>
                            <span id="order-btn-text">Complete Order</span>
                        </button>
                    </form>
                )

            default:
                return (
                    <div class="alert alert-secondary" role="alert">You don't currently have a checkout session.</div>
                );
        }
    }


    return (
        <>
            { renderCheckout(show) }
            { errorCheckout ? <div class="alert alert-danger bottom-alert" role="alert" >There was an error with the checkout.</div> : null }
        </>
    )
}

export default CheckoutDetails;
