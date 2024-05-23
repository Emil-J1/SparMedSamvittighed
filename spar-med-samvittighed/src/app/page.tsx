import Navbar from "@/components/Navbar";
import StoreList from "@/components/StoreList";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Navbar />
      
      <div>
        <h1>Dette er dine butikker i nærheden af dig</h1>
      </div>

      <StoreList zipCode='9000'/>
    </main>
  );
}