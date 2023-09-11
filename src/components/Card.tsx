import {useStores} from "../context/storesContext";
import {observer, useObserver} from "mobx-react";
import {formatNumber} from "../formatNumber";
import {Vehicle} from "../interfaces/Vehicle";

export const Card = observer(({vehicle, inCart}: {vehicle: Vehicle, inCart: boolean}) => {
    const {cartStore, vehicleStore} = useStores()

    return useObserver(() => (
        <div className="w-full max-w-sm border rounded-lg shadow bg-gray-800 border-gray-700">
            <div className="px-5 pb-5 flex flex-col justify-evenly h-full">
                <h2 className="font-semibold tracking-tight text-white">
                    { vehicle.name }
                </h2>
                <dl className="max-w-md divide-y text-white divide-gray-700 text-left">
                    <div className="flex flex-col pb-3">
                        <dt className="mb-1 md:text-lg text-gray-400">
                            Crew
                        </dt>
                        <dd className="text-lg font-semibold">
                            { vehicle.crew.includes("-") &&
                                vehicle.crew.split("-").join(" - ")
                            }
                            { !vehicle.crew.includes("-") &&
                                vehicle.crew
                            }
                        </dd>
                    </div>
                    <div className="flex flex-col py-3">
                        <dt className="mb-1 md:text-lg text-gray-400">
                            Max atmosphering speed
                        </dt>
                        <dd className="text-lg font-semibold">
                            { vehicle.maxAtmospheringSpeed }
                        </dd>
                    </div>
                    <div className="flex flex-col pt-3">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                            Cargo capacity
                        </dt>
                        <dd className="text-lg font-semibold">
                            { vehicle.cargoCapacity === null ? 0 : vehicle.cargoCapacity }
                        </dd>
                    </div>
                    <div className="flex flex-col pt-3">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                            Length
                        </dt>
                        <dd className="text-lg font-semibold">
                            { vehicle.length }
                        </dd>
                    </div>
                    <div className="flex flex-col pt-3">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                            Manufacturers
                        </dt>
                        <dd className="text-lg font-semibold">
                            { vehicle.manufacturers.join(", ") }
                        </dd>
                    </div>
                </dl>
                <div className="flex items-center justify-between mt-5">
                    {
                        (vehicle.costInCredits === 0)
                            ?
                        (<span className="text-3xl font-bold text-white">Free</span>)
                            :
                        (
                            vehicle.discounted
                                ?
                            (
                                <div className="flex items-end">
                                    <span className="text-xl font-bold text-red-600 line-through">
                                        {formatNumber(vehicle.costInCredits).toString()}
                                    </span>
                                    <span className="text-xl font-bold text-white">
                                        {formatNumber(vehicle.discountedPrice).toString()}
                                    </span>
                                    <span className="text-white">
                                        {vehicleStore.vatApplied ? "Incl. VAT" : "Excl. VAT"}
                                    </span>
                                </div>
                            )
                                :
                            (
                                <div className="flex items-end">
                                    <span className="text-xl font-bold text-white">
                                        {formatNumber(vehicle.costInCredits).toString()}
                                    </span>
                                    <span className="text-white">
                                        {vehicleStore.vatApplied ? "Incl. VAT" : "Excl. VAT"}
                                    </span>
                                </div>
                            )
                        )
                    }
                    {!inCart &&
                        <button
                            type="button"
                            className="text-white focus:ring-4 font-bold rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800"
                            onClick={() => cartStore.addItem(vehicle)}
                        >
                            Add to cart
                        </button>
                    }

                </div>
            </div>
        </div>

    ))
})