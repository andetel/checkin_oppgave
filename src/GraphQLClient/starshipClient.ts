import {GraphQLClient, gql} from "graphql-request";
import {GraphQLStarshipResponse} from "../interfaces/GraphQLStarshipResponse";
import {Vehicle} from "../interfaces/Vehicle";

const client = new GraphQLClient("https://swapi-graphql.netlify.app/.netlify/functions/index")

export const fetchStarships = async (): Promise<Vehicle[]> => {
    const query = gql`
        {
            allStarships {
                starships {
                    cargoCapacity,
                    costInCredits,
                    crew,
                    hyperdriveRating,                    
                    length,
                    manufacturers,
                    maxAtmospheringSpeed,
                    name,
                    starshipClass
                }
            }
        }
    `

    try {
        const data: GraphQLStarshipResponse = await client.request(query)
        return data.allStarships.starships
    } catch (error: any) {
        throw new Error(`GraphQL request error: ${error.message}`)
    }
}

