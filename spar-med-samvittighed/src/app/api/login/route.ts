import { NextApiRequest, NextApiResponse } from 'next'
import { signIn } from 'next-auth/react'
import { connectToDB } from '../../../../database/database'
import { User } from '../../../../models/user'
import { getSession } from 'next-auth/react'
import bcrypt  from 'bcryptjs';
import { SignJWT } from 'jose';
import  {NextResponse} from 'next/server';

interface LoginBody {
  email: string;
  password: string;
}

export async function POST(req: Request) {
      console.log('Received request:', req.method, req.body);
      const body:  LoginBody =  await req.json();
      const { email, password } = body;

      try {
        await connectToDB()
        // Look for user
        const user = await User.findOne({ email})

        // compare password
        if(user)
        {
          const isCorrectPassword = bcrypt.compareSync(password, user.password);
          if(!isCorrectPassword)
          {
            // Return error
            return NextResponse.json({
              message: "user no found"
            })
          }

          return createJwtToken(user);

        } else
        {
          // return error saying user is not found
          return NextResponse.json({
            message: "User not found"
          })
        }

      } catch(erorr: any)
      {
        return NextResponse.json({
          error: erorr.message
        })
      }
  }

   // create a JWT token
  async function createJwtToken(user: any)
  {

    try
    {
      // Create JWT TOKEN
    const secretKey = new TextEncoder().encode(
      process.env.JWTKEY
    );

    // alg
    const alg = "HS256";
    
    const jwt = await new SignJWT({})
    .setProtectedHeader({alg}).setExpirationTime("72h")
    .setSubject(user._id.toString())
    .sign(secretKey);

    return NextResponse.json({
      jwt: jwt
    })
    } catch (error: any)
    {
      return NextResponse.json({
        message: error.message
      })
    }
  }










 