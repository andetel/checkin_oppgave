import {StarshipOrVehicle} from "../interfaces/StarshipOrVehicle";
import {RootStore} from "./root.store";
import {makeAutoObservable} from "mobx";

export class CartStore {
    rootStore: RootStore
    items: StarshipOrVehicle[] = []

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this)
    }

    get itemsInCart() {
        return this.items.length
    }

    addItem(vehicle: StarshipOrVehicle) {
        this.items.push(vehicle)
    }
}