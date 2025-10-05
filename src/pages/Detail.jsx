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
    <div className="min-h-screen bg-gradient-to-br from-gray-50/80 via-white to-gray-100/60 dark:from-black dark:to-gray-900 transition-all duration-500">
      <div className="container mx-auto px-6 py-8">
        <div className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/70 shadow-lg overflow-hidden">
          {/* Product Image Section */}
          <div className="h-96 bg-gray-50 dark:bg-gray-800 flex items-center justify-center p-6">
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
                      className="w-full h-80 object-cover shadow-md"
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
                        className="w-24 h-24 object-cover border shadow-sm"
                      />
                      <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                          {item.title}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                            ${item.price}
                          </span>
                          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-sm">
                            {item.category?.name || "Uncategorized"}
                          </span>
                          <AddToCartButton product={item} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Related Products
              </h2>
              {relatedProducts.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400">No related products found.</p>
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
        className={`px-4 py-2 text-sm font-medium shadow transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-400 disabled:cursor-not-allowed ${
          added
            ? "bg-green-400 text-white"
            : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
        }`}
      >
        {added ? "Added" : "Add to Cart"}
      </button>
      {added && (
        <span className="text-green-600 dark:text-green-400 text-xs font-semibold animate-fade-in">
          ✓ Added!
        </span>
      )}
    </div>
  );
};
