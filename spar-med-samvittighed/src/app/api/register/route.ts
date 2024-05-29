import  {NextResponse} from 'next/server'
import { connectToDB } from '../../../../database/database'
import { User } from '../../../../models/user'


interface RegisterRequestBody {
    email: string;
    username: string;
    password: string;
    zipCode: string;
  }

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
        const body: RegisterRequestBody = await request.json();
        const { email, username, password, zipCode } = body;

        // Then valid data
         // Validate data (basic example, you can add more validation)
        if (!email || !username || !password || !zipCode)  {
        throw new Error('Email, username, zip code and password are required');
      }
        // Await database
        await connectToDB();
        
        // Creates the user in database
        const createdUser = await User.create({ email, username, password, zipCode }); 

        if (!createdUser.email || !createdUser.username || !createdUser.password || !createdUser.zipCode) {
            throw new Error('There was a problem, saving your data, therefor try again');
        }

        // return user
        return NextResponse.json({
            message: 'User created successfully!',
            user: createdUser
          });
          
    } catch (error: any) {
        console.error('Error creating user:', error);
        return NextResponse.json({
            message: error.message
        })    
    }   
}

function returnNextMessage(message: string)
{
    
}