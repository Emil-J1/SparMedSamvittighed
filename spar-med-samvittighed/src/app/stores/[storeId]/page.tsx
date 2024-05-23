import StoreProductList from "@/components/StoreProductList";

interface StoreProp {
  params: {
    storeId: string;
    productId: string;
  };
}

const Products: React.FC<StoreProp> = ({ params }) => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-24">
      <StoreProductList storeId={params.storeId} />
    </section>
  );
};

export default Products;
