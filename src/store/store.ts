import {Starship} from "../interfaces/Starship";
import {Vehicle} from "../interfaces/Vehicle";
import {fetchStarships} from "../GraphQLClient/starshipClient";
import {fetchVehicles} from "../GraphQLClient/vehicleClient";
import {makeAutoObservable, runInAction} from "mobx";

class Store {
    starships: Starship[] = []
    vehicles: Vehicle[] = []

    constructor() {
        makeAutoObservable(this)
        runInAction(this.prefetchData)
    }

    createStarship(starship: Starship) {
        this.starships.push(starship)
    }

    createVehicle(vehicle: Vehicle) {
        this.vehicles.push(vehicle)
    }

    get totalVehicles() {
        return this.vehicles.length + this.starships.length
    }

    prefetchData = () => {
        fetchStarships()
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    this.createStarship(data[i])
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