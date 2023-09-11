import {ToggleButton} from "../components/ToggleButton";
import {NumberRangeFilter} from "../components/Filter/NumberRangeFilter";
import {CardList} from "../components/CardList";
import {InputWithButton} from "../components/Filter/InputWithButton";
import React from "react";
import {useStores} from "../context/storesContext";
import {vehicleFilters} from "../vehicleFilters";

export const HomePage = () => {
    const {vehicleStore} = useStores()

    const filterByCrewMembers = (from: number | undefined, to: number | undefined, reset: boolean = false) => {
        const {crew} = vehicleFilters

        if (reset) {
            crew.active = false
            crew.min = undefined
            crew.max = undefined
        } else {
            crew.min = from
            crew.max = to

            if (!crew.active) {
                crew.active = true
            }
        }

        vehicleStore.filter()
    }

    const filterByCost = (from: number | undefined, to: number | undefined, reset: boolean = false) => {
        const {cost} = vehicleFilters

        if (reset) {
            cost.active = false
            cost.min = undefined
            cost.max = undefined
        } else {
            cost.min = from
            cost.max = to

            if (!cost.active) {
                cost.active = true
            }
        }

        vehicleStore.filter()
    }

    const filterByAtmosphereSpeed = (from: number | undefined, to: number | undefined, reset: boolean = false) => {
        const {atmosphereSpeed} = vehicleFilters

        if (reset) {
            atmosphereSpeed.active = false
            atmosphereSpeed.min = undefined
            atmosphereSpeed.max = undefined
        } else {
            atmosphereSpeed.min = from
            atmosphereSpeed.max = to

            if (!atmosphereSpeed.active) {
                atmosphereSpeed.active = true
            }
        }

        vehicleStore.filter()
    }

    const filterByLength = (from: number | undefined, to: number | undefined, reset: boolean = false) => {
        const {length} = vehicleFilters

        if (reset) {
            length.active = false
            length.min = undefined
            length.max = undefined
        } else {
            length.min = from
            length.max = to

            if (!length.active) {
                length.active = true
            }
        }

        vehicleStore.filter()
    }

    const filterByCargoCapacity = (from: number | undefined, to: number | undefined, reset: boolean = false) => {
        const {cargoCapacity} = vehicleFilters

        if (reset) {
            cargoCapacity.active = false
            cargoCapacity.min = undefined
            cargoCapacity.max = undefined
        } else {
            cargoCapacity.min = from
            cargoCapacity.max = to

            if (!cargoCapacity.active) {
                cargoCapacity.active = true
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
        <div className="flex flex-col w-screen pt-20 border-gray-200 bg-gray-900">
            <ToggleButton label="Toggle VAT" handler={toggleVAT} />
            <div className="flex items-start justify-center gap-3">
                <NumberRangeFilter heading="crew members" handler={filterByCrewMembers} />
                <NumberRangeFilter heading="cost" handler={filterByCost} />
                <NumberRangeFilter heading="atmosphere speed" handler={filterByAtmosphereSpeed} />
                <NumberRangeFilter heading="cargo capacity" handler={filterByCargoCapacity} />
                <NumberRangeFilter heading="length" handler={filterByLength} />
            </div>
            <div className="flex justify-center mt-3">
                <CardList />
            </div>
            <InputWithButton label="Discount code:" placeholder="code" inputType="text" buttonText="Apply" handler={applyDiscount} />
        </div>
    )
}