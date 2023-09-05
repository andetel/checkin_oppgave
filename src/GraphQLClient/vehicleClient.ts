import {GraphQLClient, gql} from "graphql-request";
import {GraphQLVehicleResponse} from "../interfaces/GraphQLVehicleResponse";
import {Vehicle} from "../interfaces/Vehicle";

const client = new GraphQLClient("https://swapi-graphql.netlify.app/.netlify/functions/index")

export const fetchVehicles = async (): Promise<Vehicle[]> => {
    const query = gql`
        {
            allVehicles {
                vehicles {
                    cargoCapacity,
                    costInCredits,
                    crew,
                    length,
                    manufacturers,
                    maxAtmospheringSpeed,
                    name
                }
            }
        }
    `

    try {
        const data: GraphQLVehicleResponse = await client.request(query)
        return data.allVehicles.vehicles
    } catch (error: any) {
        throw new Error(`GraphQL request error: ${error.message}`)
    }
}

