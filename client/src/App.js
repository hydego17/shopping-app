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
              <Route path="/login" component={LoginScreen} />
              <Route path="/register" component={RegisterScreen} />
              <Route path="/product/:id" component={ProductScreen} />
              <Route path="/cart/:id?" component={CartScreen} />
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
