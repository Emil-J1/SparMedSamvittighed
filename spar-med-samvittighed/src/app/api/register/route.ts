import  {NextResponse} from 'next/server'
import { connectToDB } from '../../../../database/database'
import { User } from '../../../../models/user'

export async function GET()
{
    return NextResponse.json({
        hello: 'world'
    })
}

// Post, need to transfer the request, to an user object and then save to the data
// Requirement: The user should not exist in the database
// Requirement: The data should be validated
export async function POST(request: Request)
{
    try {
        const data = await request.json();
        // Await database
        await connectToDB
    
        // Creates the user from database
        const user = await User.create(data);  

        return NextResponse.json({
            message: 'User created successfully!',
            user: user
          });

    } catch (error) {
        return NextResponse.json({
            error: error
        })    
    }   
}