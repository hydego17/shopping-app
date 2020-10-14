import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreens from "./screens/HomeScreens";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import { AnimatePresence, motion } from "framer-motion";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";

const App = () => {
  return (
    <Router>
      <AnimatePresence initial={false}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <Header />
          <main>
            <Container>
              <Route path="/order/:id" component={OrderScreen} />
              <Route path="/placeorder" component={PlaceOrderScreen} />
              <Route path="/shipping" component={ShippingScreen} />
              <Route path="/payment" component={PaymentScreen} />
              <Route path="/login" component={LoginScreen} />
              <Route path="/register" component={RegisterScreen} />
              <Route path="/profile" component={ProfileScreen} />
              <Route path="/product/:id" component={ProductScreen} />
              <Route path="/cart/:id?" component={CartScreen} />
              <Route path="/admin/userlist" component={UserListScreen} />
              <Route path="/admin/user/:id/edit" component={UserEditScreen} />
              <Route path="/admin/productlist" component={ProductListScreen} />
              <Route
                path="/admin/product/:id/edit"
                component={ProductEditScreen}
              />
              <Route path="/" component={HomeScreens} exact />
            </Container>
          </main>
          <Footer />
        </motion.div>
      </AnimatePresence>
    </Router>
  );
};

export default App;
