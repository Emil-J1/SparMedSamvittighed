import StoreProductList from "@/comps/StoreProductList";

interface StoreProp {
  params: {
    storeId: string;
    productId: string;
  };
}

export default function Products({ params }: StoreProp) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Products from storeid {params.storeId}</h1>
        <StoreProductList />
    </div>
  );
}
