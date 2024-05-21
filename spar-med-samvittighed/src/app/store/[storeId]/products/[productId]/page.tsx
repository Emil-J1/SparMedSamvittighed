import ProductPage from "@/comps/Product";

interface ProductProp {
  params: {
    storeId: string;
    productId: string;
  };
}

export default function ProductDetails({ params }: ProductProp) {
  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-24 border rounded-lg">
      <h1>Info about the product {params.productId}</h1>
      <ProductPage storeId={params.storeId} productId={params.productId} />
    </section>
  );
}