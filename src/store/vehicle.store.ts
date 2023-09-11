import {fetchStarships} from "../GraphQLClient/starshipClient";
import {fetchVehicles} from "../GraphQLClient/vehicleClient";
import {makeAutoObservable, runInAction} from "mobx";
import {RootStore} from "./root.store";
import {Vehicle} from "../interfaces/Vehicle";
import {vehicleFilters} from "../vehicleFilters";
import {landOrAir} from "../landOrAir";

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
        if (vehicle.costInCredits === null) vehicle.costInCredits = 0

        if (landOrAir.air.includes(vehicle.vehicleClass)) vehicle.vehicleClassType = "air"
        else vehicle.vehicleClassType = "land"

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
        const {
            crew,
            cost,
            atmosphereSpeed,
            cargoCapacity,
            length,
            vehicleClass
        } = vehicleFilters

        this.vehiclesDisplayed = this.vehicles
            .filter(vehicle => {
                if (crew.active && (crew.max !== undefined && crew.min !== undefined)) {
                    if (vehicle.crew.includes("-")) {
                        let crewFrom = vehicle.crew.split("-")[0]
                        let crewTo= vehicle.crew.split("-")[1]

                        return parseInt(crewFrom) >= crew.min && parseInt(crewTo) <= crew.max
                    } else if (vehicle.crew.includes(",")) {
                        let newCrew = parseInt(vehicle.crew.split(",").join(""))

                        return newCrew >= crew.min && newCrew <= crew.max
                    } else {
                        return parseInt(vehicle.crew) >= crew.min && parseInt(vehicle.crew) <= crew.max
                    }
                }
                return true
            })
            .filter(vehicle => {
                if (cost.active && (cost.max !== undefined && cost.min !== undefined)) {
                    return vehicle.costInCredits >= cost.min && vehicle.costInCredits <= cost.max
                }
                return true
            })
            .filter(vehicle => {
                if (atmosphereSpeed.active && (atmosphereSpeed.max !== undefined && atmosphereSpeed.min !== undefined)) {
                    return vehicle.maxAtmospheringSpeed >= atmosphereSpeed.min && vehicle.maxAtmospheringSpeed <= atmosphereSpeed.max
                }
                return true
            })
            .filter(vehicle => {
                if (length.active && (length.max !== undefined && length.min !== undefined)) {
                    return vehicle.length >= length.min && vehicle.length <= length.max
                }
                return true
            })
            .filter(vehicle => {
                if (cargoCapacity.active && (cargoCapacity.max !== undefined && cargoCapacity.min !== undefined)) {
                    return vehicle.cargoCapacity >= cargoCapacity.min && vehicle.cargoCapacity <= cargoCapacity.max
                }
                return true
            })
            .filter(vehicle => {
                if (vehicleClass.active && vehicleClass.value !== undefined) {
                    return vehicle.vehicleClassType === vehicleClass.value
                }
                return true
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