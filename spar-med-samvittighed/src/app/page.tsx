import { useClient } from '../../.next/';
import YourComponent from "./comps/Api";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <YourComponent />
    </main>
  );
}
