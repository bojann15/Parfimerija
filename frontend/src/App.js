import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GlobalContextProvider } from './context/globalState';
import Header from './components/Headers/Header';
import NotFound from './utilis/NotFound';
import Products from './components/Products/Products';
import DetailProduct from './components/DetailPage/DetailProduct';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Cart from './components/Cart/Cart';
import OrderHistory from './components/History/OrderHistory';
import OrderDetails from './components/History/OrderDetails';
import Category from './components/Category/Category';
import CreateProduct from './components/CreateProduct/CreateProduct';
const App = () => {
  return (
    <GlobalContextProvider>

      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/product/:id" exact component={DetailProduct} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/history" exact component={OrderHistory} />
            <Route path="/history/:id" exact component={OrderDetails} />
            <Route path="/category" exact component={Category} />
            <Route path="/create_product" exact component={CreateProduct} />
            <Route path="/edit_product/:id" exact component={CreateProduct} />

            <Route path="*" exact component={NotFound} />

          </Switch>
        </div>
      </Router>
    </GlobalContextProvider>
  )
}
export default App;
