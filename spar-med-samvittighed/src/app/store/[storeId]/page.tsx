import StoreProductList from "@/components/StoreProductList";

interface StoreProp {
  params: {
    storeId: string;
    productId: string;
  };
}

const Products: React.FC<StoreProp> = ({ params }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Products from store ID: {params.storeId}</h1>
      <StoreProductList storeId={params.storeId} />
    </div>
  );
};

export default Products;
