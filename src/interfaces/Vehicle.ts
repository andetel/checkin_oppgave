export interface Vehicle {
    crew: string,
    costInCredits: number,
    maxAtmospheringSpeed: number,
    hyperdriveRating?: number,
    cargoCapacity: number,
    length: number,
    manufacturers: Array<string>,
    name: string,
    discounted: boolean,
    discountedPrice: number
}