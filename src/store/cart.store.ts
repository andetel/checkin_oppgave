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

    get totalCost() {
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

    addItem(vehicle: Vehicle) {
        this.items.push(vehicle)
    }
}