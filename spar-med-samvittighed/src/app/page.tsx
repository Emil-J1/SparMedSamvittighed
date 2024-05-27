import Navbar from "@/components/Navbar";
import StoreList from "@/components/StoreList";
import { cookies } from "next/headers";
import decryptAction from "../serveractions/decryptaction";
import getUserAction from "@/serveractions/user/getUserAction";

export default async function Home() {
  const tokenCookie = cookies().get("Authorization");

  let decryptedData = null;
  let user = null;

  const token = tokenCookie ? tokenCookie.value : null;

  try {
    const result = await decryptAction(token);
    if (result.success) {
      decryptedData = result.data;
      if (decryptedData) {
        const userId = decryptedData.sub;
        let data = await getUserAction(userId);
        user = data.user;
        console.log("Decrypted data:", decryptedData);
        console.log("User data:", user);
      } else {
        console.error("No decrypted data");
      }
    } else {
      console.error("Decryption failed");
    }
  } catch (error) {
    console.error("Decryption error:", error);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {token ? (
        user ? (
          <>
            <Navbar />
            <div>
              <h1>Dette er dine butikker i nærheden af dig</h1>
            </div>
            <StoreList zipCode={user.zipCode} />
          </>
        ) : (
          <h1>Loading user data...</h1>
        )
      ) : (
        <h1>Error</h1>
      )}
    </main>
  );
}