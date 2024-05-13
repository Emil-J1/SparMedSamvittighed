const Product = () => {
        // Function to format date strings
        const formatDate = (dateString) => {
            return new Date(dateString).toLocaleDateString('da-DK', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            });
        };

    return (
        <article className="max-w-md mx-auto bg-white shadow-md overflow-hidden md:max-w-2xl">
            <div className="md:flex">
                <div className="md:flex-shrink-0">
                    <img className="w-full object-cover md:w-48" src="https://digitalassets.sallinggroup.com/image/upload/e_trim/c_limit,e_sharpen:80,f_auto,q_auto,w_400,h_400/a96465ed8ccaaa588028f9889a4d3922" alt="HAMBURGERRYG ØGO" />
                </div>
                <div className="p-8 text-gray-700">
                    <h3 className="text-2xl font-bold mb-2">HAMBURGERRYG ØGO</h3>
                    <p className="mb-4">Kategori: Mejeri & køl>Pålæg>Kødpålæg>Hamburgerryg</p>
                    <p><b>Pris:</b> 14 DKK</p>
                    <p><b>Gammel pris:</b> 17.95 DKK</p>
                    <p><b>Besparelse:</b> 3.95 DKK eller 22.01%</p>
                    <p><b>Antal tilbage:</b> 2</p>
                    <p><b>Sat på tilbud den:</b> {formatDate('2024-05-12T09:38:54.000Z')}</p>
                    <p><b>Tilbudet slutter:</b> {formatDate('2024-05-13T21:59:59.000Z')}</p>
                    <p><b>Tilbuddet blev sidst opdateret den:</b> {formatDate('2024-05-12T09:39:13.000Z')}</p>
                </div>
            </div>
        </article>

/* <article className="max-w-md mx-auto bg-white shadow-md overflow-hidden md:max-w-2xl">
<div className="md:flex">
    <div className="md:flex-shrink-0">
        <img className="h-48 w-full object-cover md:w-48" src={product.product.image} alt={product.product.description} />
    </div>
    <div className="p-8">
        <h3 className="text-2xl font-bold mb-2">{product.product.description}</h3>
        <p className="text-gray-700 mb-4">Kategori: {product.product.categories.da}</p>
        <p><b>Pris:</b> {product.offer.newPrice} DKK</p>
        <p><b>Gammel pris:</b> {product.offer.originalPrice} DKK</p>
        <p><b>Besparelse:</b> {product.offer.discount} DKK eller {product.offer.percentDiscount}%</p>
        <p><b>Antal tilbage:</b> {product.offer.stock}</p>
        <p><b>Sat på tilbud den:</b> {formatDate(product.offer.startTime)}</p>
        <p><b>Tilbudet slutter:</b> {formatDate(product.offer.endTime)}</p>
        <p><b>Tilbuddet blev sidst opdateret den:</b> {formatDate(product.offer.lastUpdate)}</p>
    </div>
</div>
</article>  */
    );
};

export default Product;