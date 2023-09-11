import React from "react";
import {useStores} from "../context/storesContext";
import {Card} from "./Card";
import {observer} from "mobx-react";

export const ShoppingCartList = observer(() => {
    const {cartStore} = useStores()

    return (
        <div className="flex flex-row flex-wrap max-w-screen-xl justify-center gap-3">
            {
                cartStore.items.map((data) => (
                    <Card key={data.name} vehicle={data} inCart/>
                ))
            }
        </div>
    )
})