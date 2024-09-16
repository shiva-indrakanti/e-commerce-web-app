import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Shop from './pages/Shop';
import Cart from  './pages/Cart';
import LoginSignUp from  './pages/LoginSignUp';
import Home from  './pages/Home';
import ProductPage from './pages/productpage/ProductPage';
import WishList from './pages/wishlist/WishList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
        <Route path='/' element={<Home/>} />
          <Route path='/shop' element={<Shop/>} />
          <Route path='/login' element={<LoginSignUp/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path="/shop/:productId" element={<ProductPage />} />
          <Route path='/wishlist' element={<WishList/>} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
