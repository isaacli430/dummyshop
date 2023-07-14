import { Outlet } from "react-router-dom";
import "bootstrap/js/src/collapse.js";

const Layout = ({ categories }) => {

    return (
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">Dummy Shop</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            {
                                categories === null ? (<></>) : ( JSON.parse(categories).map((category) => (
                                    <li class="nav-item">
                                        <a class="nav-link" aria-current="page" href={"/products/" + category.slug}>{category.name}</a>
                                    </li>
                                )) )
                            }
                        </ul>
                        <a id="cart-icon" class="nav-link" href="/cart"><i class="bi bi-cart"></i></a>
                    </div>
                </div>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout;
