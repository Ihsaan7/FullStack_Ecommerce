import { NavLink, useLoaderData } from "react-router-dom";
import ProductCard from "../component/home/ProductCard";

export function Store() {
  const products = useLoaderData();

  // Extract unique category names from products
  const uniqueCategories = [
    ...new Set(products.map((prod) => prod.category?.name).filter(Boolean))
  ];

  return (
    <div className="main h-full flex w-full">
      {/* Sidebar */}
      <div className="hleft h-screen w-[30%] border-2 flex items-center justify-center">
        <div>
          <h1 className="text-xl font-bold mb-4">Search</h1>
          <input
            className="border-2 px-2 py-1 mb-4 w-full"
            type="text"
            placeholder="Search Here!"
          />
          <div className="border-2 p-3 space-y-2">
            {uniqueCategories.slice(0,8).map((catName) => (
              <NavLink
                key={catName}
                to={`/store?category=${catName}`}
                className="block text-blue-600 hover:underline"
              >
                {catName}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="hright w-full h-full border-2 pt-5 px-6">
        <h1 className="text-3xl font-bold mb-6">Everything At One Place</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((prod) => (
            <>
            {console.log(prod.id)}
            <ProductCard
              key={prod.id}
              id={prod.id}
              price={prod.price}
              title={prod.title}
              url={prod.images[0]}
              category={prod.category?.name || "Uncategorized"}
              
            />
            </>
          ))}
          <button>Helllo</button>
        </div>
      </div>
    </div>
  );
}