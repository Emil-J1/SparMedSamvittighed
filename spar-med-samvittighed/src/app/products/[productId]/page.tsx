import Product from '../../comps/Product'

interface ProductProp {
    params: {
      productId: string;
    };
  }

export default function ProductDetails({ params } : ProductProp){
    return( <section className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1> Info about the product {params.productId} </h1>
        <Product />
         </section>);
}