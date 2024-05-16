import ProductPage from "@/comps/Product";

interface ProductDetailsProps {
  params: {
    productId: string;
  };
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ params }) => {
  const { productId } = params;

  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1> Produkt EAN: {productId} </h1>
      <ProductPage productId={productId} />
    </section>
  );
};

export default ProductDetails;
