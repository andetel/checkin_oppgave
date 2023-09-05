import {VehicleStore} from "./vehicle.store";
import {CartStore} from "./cart.store";

export class RootStore {
    vehicleStore: VehicleStore
    cartStore: CartStore

    constructor() {
        this.vehicleStore = new VehicleStore(this)
        this.cartStore = new CartStore(this)
    }
}