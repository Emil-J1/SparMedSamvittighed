import Navbar from "@/components/Navbar";
import StoreList from "@/components/StoreList";
import { cookies } from "next/headers";
import decryptAction from "../serveractions/decryptaction";
import getUserAction from "@/serveractions/user/getUserAction";
import Link from "next/link";

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
    <main className="flex min-h-screen min-w-screen flex-col items-center justify-between p-24 max-sm:p-0 bg-stone-100 pt-0">
      {token ? (
        user ? (
          <section className="flex h-full w-full flex-col items-center justify-between p-24 max-sm:p-0 bg-stone-100 max-sm:pt-10">
            <Navbar />
            <div className="flex min-h-screen flex-col items-center justify-between p-24 max-sm:p-0 max-sm:pt-20">
              <Link
                href="/stores"
                className="flex flex-col items-center justify-center w-40 mb-10 max-sm:mb-0 max-sm:pt-0"
              >
                <button className="bg-black border border-black hover:bg-white hover:text-black transition ease-in-out duration-300 text-white font-bold mt-6 py-2 px-1 rounded-xl focus:outline-none focus:shadow-outline self-center w-full">
                  Se andre butikker
                </button>
              </Link>
              <h1 className="flex justify-center text-3xl pb-12 text-gray-800">
                Butikker nær dig
              </h1>
              <StoreList zipCode={user.zipCode} />
            </div>
          </section>
        ) : (
          <h1>Loading user data...</h1>
        )
      ) : (
        <h1>Error</h1>
      )}
    </main>
  );
}
