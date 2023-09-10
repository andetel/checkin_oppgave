import {InputWithButton} from "../components/Filter/InputWithButton";
import React from "react";
import {useStores} from "../context/storesContext";

export const Checkout = () => {
    const {vehicleStore} = useStores()

    const applyDiscount = (discountCode: string) => {
        vehicleStore.applyDiscount(discountCode)
    }


    return (
        <>
            {!vehicleStore.discountApplied &&
                <InputWithButton
                    label="Discount code:"
                    placeholder="code"
                    inputType="text"
                    buttonText="Apply"
                    handler={applyDiscount}
                />
            }
        </>
    )
}