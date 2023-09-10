// import {Starship} from "./Starship";
import {Vehicle} from "./Vehicle";

export interface GraphQLStarshipResponse {
    allStarships: {
        starships: Vehicle[]
    }
}