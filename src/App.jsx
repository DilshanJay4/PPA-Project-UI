import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from "./pages/ProductList";
import Success from './pages/Success';

import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';


const App = () => {


  return (

    <Router>
      <Routes>

         <Route path="/"  element={ <Home/> } />
         <Route path="/products/:category"  element={ <ProductList/> } />
         <Route path="/products"  element={ <ProductList/> } />
         <Route path="/product/:id"  element={ <Product/> } />
         <Route path="/product/:title"  element={ <Product/> } />
         <Route path="/cart"  element={ <Cart/> } />
         <Route path="/success"  element={ <Success/> } />
         <Route path="/login"  element={ <Login/> } />
         <Route path="/register"  element={ <Register/> } />

      </Routes>
    </Router>

    
   );

}

 
export default App;


    // <ProductList/>
    // <Home/>
    // <Product/>
    // <Register/>
    // <Login/>
    // <Cart/>