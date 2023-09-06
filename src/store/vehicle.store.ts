import {fetchStarships} from "../GraphQLClient/starshipClient";
import {fetchVehicles} from "../GraphQLClient/vehicleClient";
import {makeAutoObservable, runInAction} from "mobx";
import {StarshipOrVehicle} from "../interfaces/StarshipOrVehicle";
import {RootStore} from "./root.store";

export class VehicleStore {
    rootStore: RootStore
    vehicles: StarshipOrVehicle[] = []

    FILTERS = [
        { type: "crew", key: "crew", min: 0, max: 0 }
    ]

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this)
        runInAction(this.prefetchData)
    }

    createVehicle(vehicle: StarshipOrVehicle) {
        this.vehicles.push(vehicle)
    }

    get totalVehicles() {
        return this.vehicles.length
    }

    prefetchData = () => {
        fetchStarships()
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    this.createVehicle(data[i])
                }
            })

        fetchVehicles()
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    this.createVehicle(data[i])
                }
            })
    }
}