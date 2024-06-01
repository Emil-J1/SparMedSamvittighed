import Product from "@/components/Product";

interface ProductProp {
  params: {
    storeId: string;
    productId: string;
  };
}

const ProductPage: React.FC<ProductProp> = ({ params }) => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen w-screen bg-[url('https://images.pexels.com/photos/4113922/pexels-photo-4113922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]">
      <Product storeId={params.storeId} productId={params.productId} />
    </section>
  );
};

export default ProductPage;