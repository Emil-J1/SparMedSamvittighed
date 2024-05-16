import { useClient } from '../../.next/';
import MyComponent from "./comps/Api";
import StoreProductList from "@/app/comps/StoreProductList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <StoreProductList />
    </main>
  );
}
