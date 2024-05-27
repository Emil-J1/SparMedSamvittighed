"use server";
import { User } from '../../../models/user';

export default async function getUserAction(id: any) {
    try {
        let user = null;
        // Get user
        const res = await fetch(process.env.APP_URL + "/api/user",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id})
        }
        );

        if (!res.ok) {
            // Attempt to read the error message from the response
            const errorMessage = await res.text();
            console.error(`HTTP error! status: ${res.status}, message: ${errorMessage}`);

            if (res.status === 500) {
                throw new Error('Internal Server Error: The server encountered an unexpected condition.');
            } else {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
        }

        // Parse the response as JSON
        const userData = await res.json();

        // return userDatac
        return userData;

    } catch (error) {
        // Handle errors appropriately
        console.error('Error fetching user:', error);
        throw error; // Optionally rethrow the error to propagate it
    }
}