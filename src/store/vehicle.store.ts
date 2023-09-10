import {fetchStarships} from "../GraphQLClient/starshipClient";
import {fetchVehicles} from "../GraphQLClient/vehicleClient";
import {makeAutoObservable, runInAction} from "mobx";
import {RootStore} from "./root.store";
import {Vehicle} from "../interfaces/Vehicle";
import {vehicleFilters} from "../vehicleFilters";

export class VehicleStore {
    rootStore: RootStore
    vehicles: Vehicle[] = []
    vehiclesDisplayed: Vehicle[] = []

    discountApplied: boolean = false
    vatApplied: boolean = false

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this)
        runInAction(this.prefetchData)
    }

    createVehicle(vehicle: Vehicle) {
        this.vehicles.push(vehicle)
        this.vehiclesDisplayed.push(vehicle)
    }

    get totalVehicles() {
        return this.vehicles.length
    }

    applyDiscount(code: string) {
        if (code !== 'CEC') {
            return -1
        }

        if (this.discountApplied) {
            return 0
        }

        this.discountApplied = true
        this.vehiclesDisplayed.forEach(vehicle => {
            if (vehicle.manufacturers.includes("Corellian Engineering Corporation")) {
                vehicle.discountedPrice = vehicle.costInCredits * 0.85
                vehicle.discounted = true
            }
        })
    }

    toggleVAT() {
        if (!this.vatApplied) {
            this.vatApplied = true
            this.vehiclesDisplayed.forEach(vehicle => {
                if (vehicle.costInCredits !== null) {
                    vehicle.costInCredits = vehicle.costInCredits * 1.25
                }
            })
        } else {
            this.vatApplied = false
            this.vehiclesDisplayed.forEach(vehicle => {
                if (vehicle.costInCredits !== null) {
                    vehicle.costInCredits = vehicle.costInCredits / 125 * 100
                }
            })
        }
    }

    filter() {
        this.vehiclesDisplayed = this.vehicles.filter(vehicle => {
            for (const [key, value] of Object.entries(vehicleFilters)) {
                if (value.active) {
                    switch (value.name) {
                        case "cost":
                            return vehicle.costInCredits >= value.min && vehicle.costInCredits <= value.max
                    }
                } else {
                    return vehicle
                }
            }
        })
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