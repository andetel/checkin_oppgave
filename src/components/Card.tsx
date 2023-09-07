import {useStores} from "../context/storesContext";
import {StarshipOrVehicle} from "../interfaces/StarshipOrVehicle";
import {useObserver} from "mobx-react";
import {formatNumber} from "../formatNumber";

export const Card = ({vehicle, inCart}: {vehicle: StarshipOrVehicle, inCart: boolean}) => {
    const {cartStore} = useStores()

    return useObserver(() => (
        <div className="w-full max-w-sm border rounded-lg shadow bg-gray-800 border-gray-700">
            <div className="px-5 pb-5">
                <h3 className="text-xl font-semibold tracking-tight text-white">
                    { vehicle.name }
                </h3>
                <dl className="max-w-md divide-y text-white divide-gray-700 text-left">
                    <div className="flex flex-col pb-3">
                        <dt className="mb-1 md:text-lg text-gray-400">
                            Crew
                        </dt>
                        <dd className="text-lg font-semibold">
                            { vehicle.crew }
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
                            { vehicle.cargoCapacity }
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
                            {
                                vehicle.manufacturers.join(", ")
                            }
                        </dd>
                    </div>
                </dl>
                <div className="flex items-center justify-between mt-5">
                    <span className="text-3xl font-bold text-white">
                        { vehicle.costInCredits == null ? "Free" : formatNumber(vehicle.costInCredits).toString() }
                    </span>
                    {!inCart &&
                        <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            onClick={() => cartStore.addItem(vehicle)}
                        >
                            Add to cart
                        </button>
                    }

                </div>
            </div>
        </div>

    ))
}