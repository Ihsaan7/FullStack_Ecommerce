import React from 'react'
import { FiSearch } from 'react-icons/fi';
import Container from './Container'
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
      <ul className='flex gap-6'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/store">Store</Link></li>
        <li><Link to="/cart">Cart</Link></li>
      </ul>
    </div>
  );
};

const Header = () => {
  return (
    <Container>
      <div className='w-full border flex justify-around items-center py-3 bg-white shadow-md '>
        <div>
          <h3>LOGO</h3>
        </div>
        <div className="flex items-center bg-gray-100 rounded-md px-4 py-2 w-full max-w-md shadow-sm">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
          />
          <FiSearch className="text-gray-500 text-xl ml-2" />
        </div>
        <NavBar />
      </div>
    </Container>
  );
};

export default Header;