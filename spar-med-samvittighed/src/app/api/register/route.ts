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

        // Read data off request body
        const body = await request.json();
        const typedBody: { email: string; username: string } = body;
        const { email, username } = typedBody;

        // Then valid data

        
        // Await database
        await connectToDB
        
        // Creates the user in database
        const createdUser = await User.create({ email, username }); 

        // return user
        return NextResponse.json({
            message: 'User created successfully!',
            user: createdUser
          });

    } catch (error: any) {
        return NextResponse.json({
            message: error.message
        })    
    }   
}