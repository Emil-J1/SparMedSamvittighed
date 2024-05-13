import { FoodWasteData } from './types';

export async function getFoodWasteData(latitude: number | null, longitude: number | null, zip: string | null, radius: number | null, bearerToken: string): Promise<FoodWasteData[]> {
    let url: string;

    if ((latitude !== null && longitude !== null) || (zip !== null && radius !== null)) {
        // Use geographic coordinates or zip code with radius
        if (latitude !== null && longitude !== null) {
            url = `https://api.sallinggroup.com/v1/food-waste/?geo=${latitude},${longitude}`;
        } else if (zip !== null && radius !== null) {
            url = `https://api.sallinggroup.com/v1/food-waste/?zip=${zip}&radius=${radius}`;
        }
    } else {
        throw new Error('Invalid parameters. Please provide either geographic coordinates or a zip code with a radius.');
    }

    const response = await fetch(url, {
        headers: {
            Authorization: `${{ secrets.Github_Secret_Name }}`
        }
    });
    const data: FoodWasteData[] = await response.json();
    return data;
}