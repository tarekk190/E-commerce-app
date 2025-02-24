import './App.css'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './component/Layout/Layout'
import Home from './component/Home/Home'
import Cart from './component/Cart/Cart'
import Brands from './component/Brands/Brands'
import Products from './component/Products/Products'
import Login from './component/Login/Login'
import Register from './component/Register/Register'
import Categories from './component/Categories/Categories'
import Wishlist from './component/Wishlist/Wishlist'
import Notfound from './component/Notfound/Notfound'
import Forgetpassword from './component/Forgetpassword/Forgetpassword'
import UserContextProvider from './Context/UserContext'
import Protectedroute from './component/Protectedroute/Protectedroute'
import ProductsDetails from './component/ProductsDetails/ProductsDetails'
import CartContextProvider from './Context/CartContext'
import { Toaster } from 'react-hot-toast'
import Checkout from './component/Checkout/Checkout'
import Verifycode from './component/Verifycode/Verifycode'
import WishlistContextProvider from './Context/WishlistContext'

function App() {
  let router = createBrowserRouter([
    {path:'',element:<Layout/> , children:[
    {index:true, element:<Protectedroute><Home/></Protectedroute>},
    {path:'cart', element:<Protectedroute><Cart/></Protectedroute>},
    {path:'brands', element:<Protectedroute><Brands/></Protectedroute>},
    {path:'products', element:<Protectedroute><Products/></Protectedroute>},
    {path:'productsdetails/:id', element:<Protectedroute><ProductsDetails/></Protectedroute>},
    {path:'products/productsdetails/:id', element:<Protectedroute><ProductsDetails/></Protectedroute>},
    {path:'categories', element:<Protectedroute><Categories/></Protectedroute>},
    {path:'wishlist', element:<Protectedroute><Wishlist/></Protectedroute>},
    {path:'checkout', element:<Protectedroute><Checkout/></Protectedroute>},
    
    {path:'login', element:<Login/>},
    {path:'login/forgetpass', element:<Forgetpassword/>},
    {path:'verify-code', element:<Verifycode/>},
    {path:'register', element:<Register/>},
    {path:'*', element:<Notfound/>},
    ]}
  ])

  return (
    <WishlistContextProvider>
    <CartContextProvider>
      <UserContextProvider>
        <RouterProvider router={router}>
        </RouterProvider>
          <Toaster/>
      </UserContextProvider>
    </CartContextProvider>
    </WishlistContextProvider>
  );
  
}
export default App
