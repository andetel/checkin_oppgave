import {useStores} from "../context/storesContext";
import {StarshipOrVehicle} from "../interfaces/StarshipOrVehicle";
import {useObserver} from "mobx-react";

export const Card = ({vehicle}: {vehicle: StarshipOrVehicle}) => {
    const {cartStore} = useStores()

    return useObserver(() => (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    { vehicle.name }
                </h5>
                <div className="flex items-center justify-between mt-5">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        { vehicle.costInCredits == null ? 0 : vehicle.costInCredits.toString() }
                    </span>
                    <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={() => cartStore.addItem(vehicle)}
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        </div>

    ))
}