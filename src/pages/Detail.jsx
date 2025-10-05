import React, { useContext } from "react";
import { useLoaderData, useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "../component/home/ProductCard";

const Detail = () => {
  const { id } = useParams();
  const products = useLoaderData();
  const navigate = useNavigate();
  const { addToCart } = useContext(ProductContext);
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

  const handleBuyNow = () => {
    if (addToCart && product) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        url: product.images?.[0] || product.image || product.url,
        category: product.category?.name || "Uncategorized",
        quantity: 1,
      });
      // Redirect to cart page
      navigate('/cart');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white/5 to-gray-100/10 dark:from-black/10 dark:to-gray-900/20 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</a>
            <span>/</span>
            <a href="/store" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Store</a>
            <span>/</span>
            <span className="text-gray-900 dark:text-white">{product.title}</span>
          </div>
        </nav>

        {/* Main Product Section */}
        <div className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/70 shadow-lg overflow-hidden mb-12">
          <div className="grid lg:grid-cols-2 gap-0">
            
            {/* Product Images */}
            <div className="bg-gray-50 dark:bg-gray-800 p-8">
              <div className="aspect-square max-w-md mx-auto">
                <img
                  src={product.images?.[0] || product.image || product.url}
                  alt={product.title}
                  className="w-full h-full object-cover shadow-lg"
                />
              </div>
              
              {/* Thumbnail Images */}
              <div className="flex justify-center space-x-2 mt-6">
                {[product.images?.[0] || product.image || product.url].map((img, index) => (
                  <button
                    key={index}
                    className="w-16 h-16 border-2 border-gray-300 dark:border-gray-600 overflow-hidden hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                  >
                    <img
                      src={img}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="p-8 lg:p-12">
              <div className="space-y-6">
                
                {/* Category Badge */}
                <div>
                  <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-sm font-medium">
                    {product.category?.name || "Uncategorized"}
                  </span>
                </div>

                {/* Product Title */}
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    {product.title}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    {product.description || "Premium quality product designed for modern lifestyle. Experience luxury and comfort with this exceptional item."}
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-4">
                  <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                    ${product.price}
                  </span>
                  <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                    ${(product.price * 1.2).toFixed(0)}
                  </span>
                  <span className="px-2 py-1 bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300 text-sm font-medium">
                    Save 20%
                  </span>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Key Features:</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      Premium quality materials
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      Modern design and style
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      Durable and long-lasting
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      Easy to maintain
                    </li>
                  </ul>
                </div>

                {/* Quantity and Add to Cart */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Quantity:</label>
                    <div className="flex items-center border border-gray-300 dark:border-gray-600">
                      <button className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">-</button>
                      <span className="px-4 py-2 text-gray-900 dark:text-white font-medium">1</span>
                      <button className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">+</button>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <AddToCartButton product={product} />
                    <button 
                      onClick={handleBuyNow}
                      className="flex-1 px-6 py-3 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-semibold hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">Availability:</span>
                      <span className="ml-2 text-green-600 dark:text-green-400">In Stock</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">Shipping:</span>
                      <span className="ml-2">Free shipping</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">Returns:</span>
                      <span className="ml-2">30 days</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">Warranty:</span>
                      <span className="ml-2">1 year</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/70 shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Related Products
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-slate-800 mx-auto"></div>
            </div>
            
            {relatedProducts.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 py-12">
                No related products found.
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
    <button
      onClick={handleAdd}
      disabled={added}
      className={`px-6 py-3 font-semibold transition-all duration-300 transform ${
        added
          ? "bg-green-500 text-white shadow-lg scale-105"
          : "bg-gradient-to-r from-blue-600 to-slate-800 text-white hover:from-blue-700 hover:to-slate-900 shadow-md hover:shadow-lg"
      }`}
    >
      {added ? "✓ Added to Cart" : "Add to Cart"}
    </button>
  );
};
