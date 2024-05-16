import ProductList from "@/comps/ProductList";

export default function Products() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Products</h1>
        <ProductList>
            {/* ProductList component */}
        </ProductList>
    </div>
  );
}
