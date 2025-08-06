import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import Product from "./pages/Product.jsx";
import Navbar from './components/Navbar.jsx'
import Footer from "./components/Footer.jsx";
import Cart from "./pages/Cart.jsx";
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import NotFound from './pages/NotFound.jsx'
import Profile from './pages/Profile.jsx'
import ProductsProvider from './context/ProductsContext'
import CartProvider from './context/CartContext'
import UserProvider from './context/UserContext'
import ProtectedRoute from './components/ProtectedRoute.jsx';


const App = () => {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <CartProvider>
            <ProductsProvider>
              <Navbar/>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/register" element={                    
                    <ProtectedRoute>
                      <Register />
                    </ProtectedRoute>
                    } 
                  />
                  <Route path="/login" element={
                    <ProtectedRoute>
                      <Login />
                    </ProtectedRoute>
                    } 
                  />
                  <Route path="/cart" element={<Cart /> }/>                  
                  <Route path="/product/:id" element={<Product />} />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                    } 
                  />
                  <Route path="/404" element={<NotFound />} />
                </Routes>
              <Footer/>
            </ProductsProvider>
          </CartProvider>
        </UserProvider>
      </BrowserRouter>

    </>
  );
};

export default App;
