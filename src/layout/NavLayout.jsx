import React from 'react';
import { FaSearch, FaStore, FaShoppingCart } from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';


export function NavLayout()
{
    return(
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

const Navbar = () => {
  return (
    <nav className="w-full h-16 bg-white shadow-md flex items-center justify-between px-6">
      {/* Logo */}
     <Link to="/"> <div className="text-xl font-bold text-blue-600">        MyShop
      </div>
      </Link>


      {/* Search Bar */}
      <div className="flex items-center w-1/2 max-w-md bg-gray-100 rounded-full px-4 py-2">
        <input
          type="text"
          placeholder="Search products..."
          className="flex-grow bg-transparent outline-none text-gray-700"
        />
        <FaSearch className="text-gray-500" />
      </div>

      {/* Store / Cart Icons */}
      <div className="flex items-center space-x-6 text-gray-700 text-xl">
       <Link to="/store"> <FaStore className="cursor-pointer hover:text-blue-600" /></Link>
        <FaShoppingCart className="cursor-pointer hover:text-blue-600" />
      </div>
    </nav>
  );
};

