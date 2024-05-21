import Product from "@/comps/Product";

interface ProductProp {
  params: {
    storeId: string;
    productId: string;
  };
}

const ProductPage: React.FC<ProductProp> = ({ params }) => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-24 border rounded-lg">
      <h1>Info about the product {params.productId}</h1>
      <Product storeId={params.storeId} productId={params.productId} />
    </section>
  );
};

export default ProductPage;