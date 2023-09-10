import React from 'react';
import {Navbar} from "./components/Navbar";
import './App.css';
import {observer} from "mobx-react";
import {useStores} from "./context/storesContext";
import {ToggleButton} from "./components/ToggleButton";
import {NumberRangeFilter} from "./components/Filter/NumberRangeFilter";
import {CardList} from "./components/CardList";
import {InputWithButton} from "./components/Filter/InputWithButton";
import {vehicleFilters} from "./vehicleFilters";

const App = observer(() => {
    const {vehicleStore} = useStores()

    const filterByCrewMembers = (from: number, to: number) => {
        return 0
    }

    const filterByCost = (from: number, to: number, reset?: boolean) => {
        const {cost} = vehicleFilters

        cost.min = from
        cost.max = to

        if (reset) {
            cost.active = false
        } else {
            if (!cost.active) {
                cost.active = true
            }
        }

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
