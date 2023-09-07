import {useStores} from "../context/storesContext";
import {observer} from "mobx-react";
import {Card} from "./Card";
import React from "react";

export const CardList = observer(() => {
    const {vehicleStore} = useStores()

    return (
        <div className="flex flex-row flex-wrap max-w-screen-xl justify-center gap-3">
            {
                vehicleStore.vehiclesDisplayed.map((data) => (
                    <Card key={data.name} vehicle={data} inCart={false}/>
                ))
            }
        </div>
    )
})