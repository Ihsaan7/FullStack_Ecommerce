import React, { useContext, useState } from "react";
import { useLoaderData, useParams, Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "../component/home/ProductCard";
import { useTheme } from "../context/ThemeContext";
import { FaArrowLeft, FaShare, FaShoppingCart } from "react-icons/fa";

const Detail = () => {
  const { id } = useParams();
  const products = useLoaderData();
  const { theme } = useTheme();
  const [selectedImage, setSelectedImage] = useState(0);
  
  const numericId = Number(id);
  const product = products.find((p) => p.id === numericId);
  
  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white/5 to-gray-100/10 dark:from-black/10 dark:to-gray-900/20 transition-all duration-500 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Product Not Found</h1>
          <Link to="/store" className="text-blue-600 dark:text-blue-400 hover:underline">
            ← Back to Store
          </Link>
        </div>
      </div>
    );
  }

  const productImages = product.images || [product.image || product.url].filter(Boolean);
  const categoryName = product.category?.name;

  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .filter((p) => {
      const name = p.category?.name;
      return categoryName && name === categoryName;
    })
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white/5 to-gray-100/10 dark:from-black/10 dark:to-gray-900/20 transition-all duration-500">
      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <Link 
          to="/store" 
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 mb-8"
        >
          <FaArrowLeft className="w-4 h-4" />
          Back to Store
        </Link>

        {/* Main Product Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="group bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-gray-800/30 overflow-hidden shadow-xl">
              <img
                src={productImages[selectedImage]}
                alt={product.title}
                className="w-full h-96 md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Image Navigation */}
              {productImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {productImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-3 h-3 transition-all duration-300 ${
                        selectedImage === index
                          ? "bg-white shadow-lg scale-125"
                          : "bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {productImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index
                        ? "border-blue-500 shadow-lg"
                        : "border-white/20 dark:border-gray-700/50 hover:border-blue-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category Badge */}
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-slate-800 text-white rounded-full text-sm font-medium shadow-lg">
              {categoryName || "Uncategorized"}
            </div>

            {/* Product Title */}
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent leading-tight">
              {product.title}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                ${product.price}
              </span>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full text-sm font-medium">
                In Stock
              </span>
            </div>

            {/* Description */}
            {product.description && (
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <AddToCartButton product={product} />
              <button className="flex-1 px-6 py-4 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-gray-700/50 text-gray-900 dark:text-white font-semibold hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                <FaShare className="w-4 h-4" />
                Share
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/20 dark:border-gray-700/50">
              <div className="text-center p-4 bg-white/5 dark:bg-black/10 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">Free</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Shipping</div>
              </div>
              <div className="text-center p-4 bg-white/5 dark:bg-black/10 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">30</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Day Returns</div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-16">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-slate-700 to-blue-900 text-white rounded-full text-sm font-medium mb-4 shadow-lg">
                RELATED PRODUCTS
              </div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
                You Might Also Like
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-slate-700 to-blue-900 mx-auto"></div>
            </div>
            
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
          </section>
        )}
      </div>
    </div>
  );
};

export default Detail;

const AddToCartButton = ({ product }) => {
  const { addToCart } = useContext(ProductContext);
  const [added, setAdded] = useState(false);
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
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      disabled={added}
      className={`flex-1 px-6 py-4 font-semibold transition-all duration-300 transform shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${
        added
          ? "bg-green-500 text-white shadow-lg scale-105"
          : "bg-gradient-to-r from-blue-600 to-slate-800 text-white hover:from-blue-700 hover:to-slate-900 hover:scale-105"
      }`}
    >
      <FaShoppingCart className="w-4 h-4" />
      {added ? "✓ Added to Cart" : "Add to Cart"}
    </button>
  );
};
