import {RootStore} from "./root.store";
import {makeAutoObservable} from "mobx";
import {Vehicle} from "../interfaces/Vehicle";

export class CartStore {
    rootStore: RootStore
    items: Vehicle[] = []

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this)
    }

    get itemsInCart() {
        return this.items.length
    }

    get totalCostExclVAT() {
        let total = 0

        this.items.forEach((vehicle) => {
            if (vehicle.discounted) {
                total += vehicle.discountedPrice
            } else {
                total += vehicle.costInCredits
            }
        })

        return total
    }

    get totalCostInclVAT() {
        let total = 0

        this.items.forEach((vehicle) => {
            if (vehicle.discounted) {
                total += vehicle.discountedPrice * 1.25
            } else {
                total += vehicle.costInCredits * 1.25
            }
        })

        return total
    }

    get totalVAT() {
        let total = 0

        this.items.forEach((vehicle) => {
            if (vehicle.discounted) {
                total += vehicle.discountedPrice * 0.25
            } else {
                total += vehicle.costInCredits * 0.25
            }
        })

        return total
    }

    addItem(vehicle: Vehicle) {
        this.items.push(vehicle)
    }
}