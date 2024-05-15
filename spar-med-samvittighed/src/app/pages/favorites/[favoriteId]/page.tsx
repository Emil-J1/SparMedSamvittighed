interface ProductProp {
    params: {
      favoriteId: string;
    };
  }

export default function ProductDetails({ params } : ProductProp){
    return( <section className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1> Your favorites {params.favoriteId} </h1>
         </section>);
}