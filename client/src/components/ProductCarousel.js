import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "../actions/productActions";

//animation
import { AnimatePresence, motion } from "framer-motion";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="warning">{error}</Message>
  ) : (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.75 }}
      >
        <Carousel
          indicators={false}
          fade={true}
          pause="hover"
          className="bg-transparent"
        >
          {products.map((product) => (
            <Carousel.Item key={product._id}>
              <Image
                className="carousel-img"
                src={product.image}
                alt={product.name}
                fluid
              />
              <Link to={`/product/${product._id}`}>
                <Carousel.Caption className="carousel-caption">
                  <h5 className="carouselname">{product.name}</h5>
                  <small className="carouseldesc">{product.description}</small>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductCarousel;
