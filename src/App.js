import React, { useState, useEffect } from "react";
import commerce from './components/Commerce';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import $ from "jquery";

import Index from './components/Index';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Navbar from './components/Navbar';
import Thanks from './components/Thanks';
import Category from './components/Category'

const App = () => {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState("{}");
  const [sentCart, setSentCart] = useState("[]");
  const [loading, setLoading] = useState("[]");
  const [loadCart, setLoadCart] = useState("load");
  const [errorCheckout, setErrorCheckout] = useState(false);
  const [categories, setCategories] = useState(localStorage.getItem("categories"));


  useEffect(() => {
    fetchCategories();
    fetchProducts();
    fetchCart();
  }, []);

  useEffect(() => {
    let t_c = JSON.parse(cart);
    for (const prodID in t_c) {
      $("#item-" + prodID).text(JSON.parse(cart)[prodID]);
    }
  }, [cart])

  const addToCart = (productId) => {
    let copyCart = JSON.parse(cart);
    if (!(productId in copyCart)) {
      copyCart[productId] = 0;
    }
    copyCart[productId]++;
    $("#item-" + productId).text(copyCart[productId]);
    setCart(JSON.stringify(copyCart));
  }

  const removeFromCart = (productId) => {
    let copyCart = JSON.parse(cart);
    if (!(productId in copyCart)) {
      copyCart[productId] = 0;
    }
    if (copyCart[productId] > 0) {
      copyCart[productId]--;
    }
    $("#item-" + productId).text(copyCart[productId]);
    setCart(JSON.stringify(copyCart));
  }

  const zeroCart = (productId) => {
    let copyCart = JSON.parse(cart);
    copyCart[productId] = 0;
    $("#item-" + productId).text(copyCart[productId]);
    setCart(JSON.stringify(copyCart));
  }

  const sendToCart = (productId) => {
    let t_c = JSON.parse(cart);
    if (productId in t_c) {
      if (t_c[productId] > 0) {
        $(".addcart-btn").attr("disabled", true);
        let copyLoading = JSON.parse(loading);
        copyLoading.push(productId);
        setLoading(JSON.stringify(copyLoading));
        commerce.cart.add(productId, t_c[productId]).then((response) => finishAddToCart(productId, response));
      }
    }
  }

  const finishAddToCart = (productId, response) => {
    zeroCart(productId);
    let copyLoading = JSON.parse(loading);
    copyLoading = copyLoading.filter(function(a){return a !== productId});
    setLoading(JSON.stringify(copyLoading));
    $(".addcart-btn").attr("disabled", false);
  }

  const fetchProducts = () => {
    commerce.products.list().then((products) => {
      setProducts(products.data);
    });
  }

  const fetchCart = () => {
    commerce.cart.retrieve().then((products) => {
      setSentCart(JSON.stringify(products.line_items));
      if (products.line_items.length > 0) {
        setLoadCart("show");
      } else {
        setLoadCart("none");
      }
    }).catch((error) => {
      setLoadCart("none");
    })
  }

  const deleteFromCart = (lineId, productId) => {
    $(".cart-btn").attr("disabled", true);
    $("#cart-delete-btn-load-" + productId).removeAttr('hidden');
    $("#cart-delete-btn-text-" + productId).attr("hidden", true);
    commerce.cart.remove(lineId).then(response => window.location.reload());
  }

  const checkoutStart = () => {
    $("#go-checkout-btn").attr("disabled", true);
    $("#go-checkout-btn-load").removeAttr('hidden');
    $("#go-checkout-btn-text").attr("hidden", true);
    commerce.checkout.generateTokenFrom('cart', commerce.cart.id()).then(response => redirectCheckout(response.id));
  }

  const redirectCheckout = (token) => {
    localStorage.setItem("checkout", token);
    window.location.replace("/checkout");
  }

  const fetchCategories = () => {
    commerce.categories.list().then(response => {
        let out = [];
        for (const category of response.data) {
          out.push({"slug": category.slug, "name": category.name});
        }
        localStorage.setItem("categories", JSON.stringify(out));
        setCategories(localStorage.getItem("categories"))
    })
  }

  const finishCheckout = (event) => {
    $("#order-btn").attr("disabled", true);
    $("#order-btn-load").removeAttr('hidden');
    $("#order-btn-text").attr("hidden", true);
    let token = localStorage.getItem("checkout");
    if (token !== undefined) {
      commerce.checkout.capture(token, {
        customer: {
          firstname: event.target.firstName.value,
          lastname: event.target.lastName.value,
          email: event.target.email.value
        },
        shipping: {
          name: 'John Doe',
          street: '123 Fake St',
          town_city: 'San Francisco',
          county_state: 'US-CA',
          postal_zip_code: '94103',
          country: 'US'
        },
        billing: {
          name: 'John Doe',
          street: '234 Fake St',
          town_city: 'San Francisco',
          county_state: 'US-CA',
          postal_zip_code: '94103',
          country: 'US'
        },
        payment: {
          gateway: 'test_gateway',
          card: {
            number: '4242424242424242',
            expiry_month: '02',
            expiry_year: '24',
            cvc: '123',
            postal_zip_code: '94107',
          },
        }
      }).then(order => {
        localStorage.setItem("orderno", order.customer_reference);
        window.location.replace("/thanks");
      }).catch(error => {
        setErrorCheckout(true);
        $("#order-btn").attr("disabled", false);
        $("#order-btn-load").attr('hidden', true);
        $("#order-btn-text").removeAttr("hidden");
      })
    }
    
    event.preventDefault();
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar categories={categories} />}>
          <Route index element={<Index products={products} addToCart={addToCart} removeFromCart={removeFromCart} cart={JSON.parse(cart)} sendToCart={sendToCart} loading={loading}/>} />
          <Route path="cart" element={<Cart sentCart={sentCart} checkoutStart={checkoutStart} loadCart={loadCart} deleteFromCart={deleteFromCart} />} />
          <Route path="checkout" element={<Checkout finishCheckout={finishCheckout} errorCheckout={errorCheckout} />} />
          <Route path="thanks" element={<Thanks />} />
          <Route path="/products/:categorySlug" element={<Category addToCart={addToCart} removeFromCart={removeFromCart} cart={JSON.parse(cart)} sendToCart={sendToCart} loading={loading}/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
};

export default App;