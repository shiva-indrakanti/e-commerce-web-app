import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import RowdyLogo from '../Assets/logo/RowdyLogo.jpg';
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Navbar = () => {

  const [menu,setMenu] = useState("home");
  const [input,setInput] =useState("");

  const cartItems = useSelector(state => state.cart.cartItems);
  const totalCartQuantity = cartItems.reduce((accumulator, product) => accumulator + product.quantity, 0);
  const changeHandler=(event)=>{
    event.preventDefault();
    setInput(event.target.value);
  }

  const handleEnter =(e)=>{
    if(e.keyCode === 13){
      performSearchOperation(input);
    }
  }

  const performSearchOperation =(searchedParameter)=>{
    console.log("Data fetch :"+ searchedParameter);
  }
  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={RowdyLogo} alt=''/>
      </div>  
      <ul className='nav-menu'>
        <li onClick={()=>{setMenu("home")}}><Link to='/' style={{textDecoration:'none' ,color: '#E7C967'}}>Home</Link> {menu === "home" ? <hr/>: <></>}</li>
        <li onClick={()=>{setMenu("shop")}}><Link to='/shop' style={{textDecoration:'none',color: '#E7C967'}}>Shop</Link> {menu === "shop" ? <hr/>: <></>}</li>
      </ul>
      <div className="nav-login-cart">
          <div>
             <input className='search-input' type='text' value={input} placeholder='search' onChange={changeHandler} onKeyDown={handleEnter}/>
           </div>
        <button id='nav-login-button'><Link to='/login' style={{textDecoration:'none', color:'coral'}}>Login</Link></button>
        <Link to='/checkout/cart' ><FaShoppingCart className='cart-icon'  /></Link>
        <div className="nav-cart-count">{totalCartQuantity}</div>
      </div>
    </div>
  )
}

export default Navbar;