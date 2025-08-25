import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from "./pages/Home.jsx";
import Product from "./components/Product.jsx";
import Navbar from './components/Navbar.jsx'
import Footer from "./components/Footer.jsx";
import Cart from "./pages/Cart.jsx";
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import NotFound from './pages/NotFound.jsx'
import Profile from './pages/Profile.jsx'
import Products from './pages/Products.jsx'
import ProductsProvider from './context/ProductsContext'
import CartProvider from './context/CartContext'
import UserProvider from './context/UserContext'
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ProductsForms from './components/ProductForm.jsx';
import FavoriteProvider from './context/FavoriteContext.jsx';
import CategoryProvider from './context/CategoryContext.jsx';

const App = () => {
  return (
    <>
      <BrowserRouter>
          <UserProvider>
            <FavoriteProvider>
              <CartProvider>
                <ProductsProvider>
                  <CategoryProvider>
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
                        <Route path="/products" element={
                            <Products />
                          }
                        />
                        <Route path="/products/new" element={
                            <ProductsForms />
                          }
                        />
                        <Route path="/products/edit/:id" element={
                            <ProductsForms />
                          }
                        />
                        <Route path="/cart" element={<Cart /> }/>
                        <Route path="/products/:id" element={<Product />} />
                        <Route path="/profile" element={
                          <ProtectedRoute>
                            <Profile />
                          </ProtectedRoute>
                          }
                        />
                        <Route path="/404" element={<NotFound />} />
                      </Routes>
                    <Footer/>
                  </CategoryProvider>
                </ProductsProvider>
              </CartProvider>
            </FavoriteProvider>
          </UserProvider>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
};

export default App;
