"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function loginAuction(
  currentState: any,
  formData: FormData
): Promise<string> {
  const email = formData.get("email");
  const password = formData.get("password");

  // Send API

  const res = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const json = await res.json();

  // Set the cookie, to 3 days
  cookies().set("Authorization", json.jwt, {
    secure: true,
    httpOnly: true,
    expires: Date.now() + 24 * 60 * 60 * 1000 * 3,
    path: "/",
    sameSite: "strict",
  });

      // If theres a message, then tell the users, theres a message for them else, return a redirect to show them it completed
      if (json.message) {
        return json.message;
      } else {
        redirect("/");
      }

}
