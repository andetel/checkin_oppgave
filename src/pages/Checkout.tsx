import {InputWithButton} from "../components/Filter/InputWithButton";
import React from "react";
import {useStores} from "../context/storesContext";
import {RecieptItem} from "../components/RecieptItem";
import {formatNumber} from "../formatNumber";

export const Checkout = () => {
    const {vehicleStore, cartStore} = useStores()

    const applyDiscount = (discountCode: string) => {
        vehicleStore.applyDiscount(discountCode)
    }


    return (
        <div className="bg-gray-900 min-h-screen flex items-center flex-col justify-center">
            <ul className="max-w-md divide-y divide-gray-700">
                {
                    cartStore.items.map(item => (
                        <RecieptItem name={item.name} price={item.costInCredits} />
                    ))
                }
            </ul>
            <section className="text-white">
                <div>
                    Total excl. VAT: {formatNumber(cartStore.totalCostExclVAT)}
                </div>
                <div>
                    VAT amount: {formatNumber(cartStore.totalVAT)}
                </div>
                <div>
                    Total incl: VAT: {formatNumber(cartStore.totalCostInclVAT)}
                </div>
            </section>
            {!vehicleStore.discountApplied &&
                <InputWithButton
                    label="Discount code:"
                    placeholder="code"
                    inputType="text"
                    buttonText="Apply"
                    handler={applyDiscount}
                />
            }
        </div>
    )
}