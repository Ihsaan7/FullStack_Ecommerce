import React, { useContext } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "../component/home/ProductCard";

const Detail = () => {
  const { id } = useParams();
  const products = useLoaderData();
  const productCat = products.find((item) => item.id === Number(id));
  const categoryObj = productCat?.category;
  const categoryName = categoryObj?.name;

  const numericId = Number(id);
  const product = products.find((p) => p.id === numericId);
  if (!product) {
    return <p className="p-6">Product not found.</p>;
  }
  const imageSrc = product.images?.[0] || product.image || product.url;

  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .filter((p) => {
      const name = p.category?.name;
      return categoryName && name === categoryName;
    })
    .slice(0, 5);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Product Image Section */}
        <div className="h-96 bg-gray-50 flex items-center justify-center p-6">
          <div className="max-w-md">
            {products
              .filter((item) => item.id === Number(id))
              .map((item) => {
                const img = item.images?.[0] || item.image || item.url;
                return (
                  <img
                    key={item.id}
                    src={img}
                    alt={item.title || "Product"}
                    className="w-full h-80 object-cover rounded-lg shadow-md"
                  />
                );
              })}
          </div>
        </div>

        <div className="p-8">
          <div className="mb-8">
            {products
              .filter((item) => item.id === Number(id))
              .map((item) => (
                <div key={item.id} className="space-y-4">
                  <div className="flex items-start gap-6">
                    <img
                      src={item.images?.[0] || item.image || item.url}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-lg border shadow-sm"
                    />
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {item.title}
                      </h1>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-3xl font-bold text-blue-600">
                          ${item.price}
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {item.category?.name || "Uncategorized"}
                        </span>
                        <AddToCartButton product={item} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="border-t pt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Related Products
            </h2>
            {relatedProducts.length === 0 && (
              <p className="text-gray-500">No related products found.</p>
            )}
            {relatedProducts.length > 0 && (
              <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {relatedProducts.map((rp) => (
                  <ProductCard
                    key={rp.id}
                    id={rp.id}
                    price={rp.price}
                    title={rp.title}
                    url={rp.images?.[0] || rp.image || rp.url}
                    category={rp.category?.name || "Uncategorized"}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;

const AddToCartButton = ({ product }) => {
  const { addToCart } = useContext(ProductContext);
  const [added, setAdded] = React.useState(false);
  if (!addToCart || !product) return null;

  const handleAdd = () => {
    if (added) return;
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      url: product.images?.[0] || product.image || product.url,
      category: product.category?.name || "Uncategorized",
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleAdd}
        disabled={added}
        className={`px-4 py-2 rounded-md text-sm font-medium shadow transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-400 disabled:cursor-not-allowed ${
          added
            ? "bg-green-400 text-white"
            : "bg-green-500 hover:bg-green-600 text-white"
        }`}
      >
        {added ? "Added" : "Add to Cart"}
      </button>
      {added && (
        <span className="text-green-600 text-xs font-semibold animate-fade-in">
          ✓ Added!
        </span>
      )}
    </div>
  );
};
