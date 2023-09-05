import {GraphQLClient, gql} from "graphql-request";
import {Starship} from "../interfaces/Starship";
import {GraphQLStarshipResponse} from "../interfaces/GraphQLStarshipResponse";

const client = new GraphQLClient("https://swapi-graphql.netlify.app/.netlify/functions/index")

export const fetchStarships = async (): Promise<Starship[]> => {
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
                    name
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

