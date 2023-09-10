import React from 'react';
import {Navbar} from "./components/Navbar";
import './App.css';
import {CardList} from "./components/CardList";
import {NumberRangeFilter} from "./components/Filter/NumberRangeFilter";
import {InputWithButton} from "./components/Filter/InputWithButton";
import {observer} from "mobx-react";
import {useStores} from "./context/storesContext";
import {ToggleButton} from "./components/ToggleButton";

const App = observer(() => {
    const {vehicleStore} = useStores()

    const filterByCrewMembers = (from: number, to: number) => {
        vehicleStore.FILTERS[0].min = from
        vehicleStore.FILTERS[0].max = to

        vehicleStore.filter()
    }

    const filterByCost = (from: number, to: number) => {
        console.log("here")
        vehicleStore.FILTERS[1].min = from
        vehicleStore.FILTERS[1].max = to

        vehicleStore.filter()
    }

    const applyDiscount = (discountCode: string) => {
        vehicleStore.applyDiscount(discountCode)
    }

    const toggleVAT = (show: boolean) => {
        vehicleStore.toggleVAT()
    }

    return (
        <div className="App">
            <Navbar />
            <div className="flex flex-col w-screen pt-20 border-gray-200 bg-gray-900">
                <ToggleButton label="Toggle VAT" handler={toggleVAT} />
                <div className="flex items-start justify-center gap-3">
                    <NumberRangeFilter heading="crew members" handler={filterByCrewMembers} />
                    <NumberRangeFilter heading="cost" handler={filterByCost} />
                    <NumberRangeFilter heading="atmosphere speed" handler={() => {}} />
                </div>
                <div className="flex justify-center mt-3">
                    <CardList />
                </div>
                <InputWithButton label="Discount code:" placeholder="code" inputType="text" buttonText="Apply" handler={applyDiscount} />
            </div>
        </div>
    );
})

export default App;
