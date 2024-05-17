import { NextApiRequest, NextApiResponse } from 'next';
import  {NextResponse} from 'next/server';

export async function GET() {
    console.log('GET /api/fetchData.ts');
    try {
        const token = '034a1ccb-ee77-48b1-a842-31d34068d90a';
        
        // Fetch data from external API
        const response = await fetch('https://api.sallinggroup.com/v1/food-waste/?zip=9000&radius=5', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Send data as response
        const data = await response.json();
        
        return NextResponse.json({
            status: 200,
            message: data,
        });
        
    } catch (error) {
        return NextResponse.json({
            error: 'An error occurred while fetching data from the API.'
        })    
    }
}