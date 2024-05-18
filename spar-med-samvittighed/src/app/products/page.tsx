import TestingProductList from "@/app/comps/TestingProductList";
import Searchbar from "../comps/Searchbar";

export default function Products() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-24">
      
      <Searchbar></Searchbar>

        <TestingProductList>
            {/* ProductList component */}
        </TestingProductList>
    </section>
  );
}
