import request, {gql} from "graphql-request";

const document = gql`
    {
        allStarships {
            starships {
                cargoCapacity,
                costInCredits,
                crew,
                hyperdriveRating,
                length,
                manufacturers,
                maxAtmospheringSpeed
            }
        }
    }
`

await request("https://swapi-graphql.netlify.app/.netlify/functions/index", document)