import {fetchStarships} from "../GraphQLClient/starshipClient";
import {fetchVehicles} from "../GraphQLClient/vehicleClient";
import {makeAutoObservable, runInAction} from "mobx";
import {StarshipOrVehicle} from "../interfaces/StarshipOrVehicle";
import {RootStore} from "./root.store";
import {Starship} from "../interfaces/Starship";
import {Vehicle} from "../interfaces/Vehicle";

export class VehicleStore {
    rootStore: RootStore
    vehicles: Vehicle[] = []
    vehiclesDisplayed: Vehicle[] = []

    discountApplied: boolean = false
    vatApplied: boolean = false

    FILTERS = [
        {
            type: "crew",
            min: 0,
            max: 0
        },
        {
            type: "cost",
            min: 0,
            max: 0
        },
        {
            type: "speed",
            min: 0,
            max: 0,
        },
        {
            type: "hyperdrive",
            min: 0,
            max: 0
        },
        {
            type: "capacity",
            min: 0,
            max: 0,
        },
        {
            type: "length",
            min: 0,
            max: 0
        },
        {
            type: "land_or_air",
            value: 0
        }
    ]

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

    // filter() {
    //     this.vehiclesDisplayed = this.vehicles.filter(vehicle => {
    //         return this.FILTERS.every(filter => {
    //             switch (filter.type) {
    //                 case "crew":
    //                     if (filter.max === 0 && filter.min === 0) {
    //                         return vehicle
    //                     } else {
    //                         // @ts-ignore
    //                         return (parseInt(vehicle.crew) >= filter.min && parseInt(vehicle.crew) <= filter.max) ? vehicle : null
    //                     }
    //                 case "cost":
    //                     if (filter.max === 0 && filter.min === 0) {
    //                         return vehicle
    //                     } else {
    //                         // @ts-ignore
    //                         return (vehicle.costInCredits >= filter.min && vehicle.costInCredits <= filter.max) ? vehicle : null
    //                     }
    //                 case "speed":
    //                     if (filter.max === 0 && filter.min === 0) {
    //                         return vehicle
    //                     } else {
    //                         // @ts-ignore
    //                         return (vehicle.maxAtmospheringSpeed >= filter.min && vehicle.maxAtmospheringSpeed <= filter.max) ? vehicle : null
    //                     }
    //             }
    //         })
    //     })
    // }

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