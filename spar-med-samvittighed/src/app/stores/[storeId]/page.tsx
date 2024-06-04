import StoreProductList from "@/components/StoreProductList";

interface StoreProp {
  params: {
    storeId: string;
    productId: string;
  };
}

const Products: React.FC<StoreProp> = ({ params }) => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-24 bg-white bg-[url('https://images.pexels.com/photos/4113922/pexels-photo-4113922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]">
      <StoreProductList storeId={params.storeId} />
    </section>
  );
};

export default Products;
