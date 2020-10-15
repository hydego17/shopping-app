import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image, Row, Col } from "react-bootstrap";
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
              <Row>
                <Col md={6}>
                  <Link to={`/product/${product._id}`}>
                    <Image
                      className="carousel-img"
                      src={product.image}
                      alt={product.name}
                      fluid
                    />
                  </Link>
                </Col>
                <Col>
                  <Carousel.Caption className="carousel-caption ">
                    <h5>{product.name}</h5>
                    <p style={{ color: "black" }}>{product.description}</p>
                  </Carousel.Caption>
                </Col>
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductCarousel;
