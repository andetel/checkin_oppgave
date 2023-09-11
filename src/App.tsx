import './App.css';
import {observer} from "mobx-react";
import {createBrowserRouter, RouterProvider, useNavigate, useNavigation} from "react-router-dom";
import {Layout} from "./pages/Layout";
import {ShoppingCart} from "./pages/ShoppingCart";
import {Checkout} from "./pages/Checkout";
import React, {useEffect} from "react";
import {HomePage} from "./pages/HomePage";
import {useStores} from "./context/storesContext";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                element: <HomePage />,
                index: true
            },
            {
                path: "shopping_cart",
                element: <ShoppingCart />
            },
            {
                path: "shopping_cart/checkout",
                element: <Checkout />
            }
        ]
    },

])


const App = observer(() => {
    return (
        <RouterProvider router={router} />
    );
})

export default App;
