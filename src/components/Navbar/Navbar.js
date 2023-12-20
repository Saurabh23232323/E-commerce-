/* eslint-disable jsx-a11y/alt-text */
import React, {useEffect, useState} from 'react';
import "./Navbar.scss";
import {Link} from "react-router-dom";
import { useSelector, useDispatch} from 'react-redux';
import { setSidebarOn } from '../../Stores/sidebarslice';
import { getAllCategories } from '../../Stores/Categoryslice';
import { getAllCarts, getCartItemsCount, getCartTotal } from '../../Stores/Cartslice';
import CartModal from "../CartModel/CartModel";

const Navbar = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories);
  const carts = useSelector(getAllCarts);
  const itemsCount = useSelector(getCartItemsCount);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTerm = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  }

  useEffect(() => {
    dispatch(getCartTotal());
  }, [carts, dispatch])

  return (
    <nav className='navbar'>
      <div className='navbar-cnt flex align-center'>
        <div className='brand-and-toggler flex align-center'>
          <button type = "button" className='sidebar-show-btn text-white' onClick={() => dispatch(setSidebarOn())}>
            <i className='fas fa-bars'></i>
          </button>
          <Link to = "/" className='navbar-brand flex align-center'>
            <span className='navbar-brand-ico'>
              <i className='fa-solid fa-bag-shopping'></i>
            </span>
            <span className='navbar-brand-txt mx-2'>
              <span className='fw-7'>Saurabh</span>Shop.
            </span>
          </Link>
        </div>

        <div className='navbar-collapse w-100'>
          <div className='navbar-search bg-white'>
            <div className='flex align-center'>
              <input type = "text" className='form-control fs-14' placeholder='Search your preferred items here' onChange={(e) => handleSearchTerm(e)} />
              <Link to = {`search/${searchTerm}`} className='text-white search-btn flex align-center justify-center'>Search
                  <i className='fa-solid fa-magnifying-glass'></i>
                </Link>
            </div>
          </div>

          <ul className='navbar-nav flex align-center fs-12 fw-4 font-manrope'>
            {
              // taking only first 8 categories
              categories.slice(0, 8).map((category, idx) => (
                <li className='nav-item no-wrap' key = {idx}>
                  <Link to = {`category/${category}`} className='nav-link text-capitalize'>{category.replace("-", " ")}</Link>
                </li>
              ))
            }
          </ul>
        </div>

        <div className='navbar-cart flex align-center'>
          <Link to = "/cart" className='cart-btn'>
            <i className='fa-solid fa-cart-shopping'></i>
            <div className='cart-items-value'>{itemsCount}</div>
            <CartModal carts = {carts} /><img src="data:image/png;base64,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"/>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar