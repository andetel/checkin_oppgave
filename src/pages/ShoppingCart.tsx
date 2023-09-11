import { Link } from "react-router-dom"
import {ShoppingCartList} from "../components/ShoppingCartList";
import {observer} from "mobx-react";
import {useStores} from "../context/storesContext";
import {formatNumber} from "../formatNumber";
import React from "react";

export const ShoppingCart = observer(() => {
    const {cartStore} = useStores()

    return (
        <div className="bg-gray-900 min-h-fit">
            <div className="flex justify-center w-screen pt-20 border-gray-200 bg-gray-900">
                <ShoppingCartList />
            </div>
            <div className="mt-5">
                <h3 className="text-white mb-5">
                    Total: {formatNumber(cartStore.totalCostExclVAT).toString()}
                </h3>
                <Link
                    to={`/shopping_cart/checkout`}
                    className="inline-flex border focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mb-5 text-center border-green-500 text-green-500 hover:text-white hover:bg-green-600 focus:ring-green-800"
                >
                    Checkout
                </Link>
            </div>
        </div>
    )
})