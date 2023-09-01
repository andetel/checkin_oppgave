import {Vehicle} from "./Vehicle";

export interface GraphQLVehicleResponse {
    allVehicles: {
        vehicles: Array<Vehicle>
    }
}