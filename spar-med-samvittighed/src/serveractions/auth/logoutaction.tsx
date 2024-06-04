"use server"
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation'

export default async function logoutAction() {
  try {
    // Delete the cookie
    cookies().delete('Authorization')

  } catch (error: any) {
    // Handle errors (e.g., invalid token)
    return {
      success: false,
      error: error.message
    };
  }

  redirect('/auth/login')


}