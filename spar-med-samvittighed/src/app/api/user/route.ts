import  {NextResponse} from 'next/server'
import { connectToDB } from '../../../../database/database'
import { User } from '../../../../models/user'

interface UserBody{
    id: string
}

export async function POST(request: Request)
{
    try {

        // Read data off request body
        const body: UserBody = await request.json();
        const { id } = body;

        // Then valid data
         // Validate data (basic example, you can add more validation)
        if (!id)  {
        throw new Error('ID is required');
      }
        // Await database
        await connectToDB();
        
        // Creates the user in database
        const foundUser = await User.findById(id); 

        if (!foundUser) {
            throw new Error('No Found User');
        }

        // return user
        return NextResponse.json({
            message: 'User was found',
            user: foundUser
          });
          
    } catch (error: any) {
        console.error('Could not find user: ', error);
        return NextResponse.json({
            message: error.message
        })    
    }   
}