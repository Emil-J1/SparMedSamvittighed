import StoreList from "@/comps/StoreList";

export default function StoreListPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="flex justify-center text-3xl pb-12">Butikker</h1>
        <StoreList />
    </div>
  );
}