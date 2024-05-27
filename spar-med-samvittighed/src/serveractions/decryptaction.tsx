"use server"
import { jwtVerify } from "jose";

const SECRET_KEY = process.env.JWTKEY;
const secretKeyUint8Array = new TextEncoder().encode(SECRET_KEY);

export default async function decryptAction(token: any) {
  try {
    // Verify and decode the token
    const { payload } = await jwtVerify(token, secretKeyUint8Array);

    // Return the decoded token data
    return {
      success: true,
      data: payload
    };
  } catch (error: any) {
    // Handle errors (e.g., invalid token)
    return {
      success: false,
      error: error.message
    };
  }
}