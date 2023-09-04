import {Starship} from "./Starship";

export interface GraphQLStarshipResponse {
    allStarships: {
        starships: Array<Starship>
    }
}