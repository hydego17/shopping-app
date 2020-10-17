import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import Meta from "../components/Meta";
import ProductCarousel from "../components/ProductCarousel";
import { listProducts } from "../actions/productActions";
import { AnimatePresence, motion } from "framer-motion";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3>FEATURED</h3>
          <Meta />
          {!keyword ? (
            <ProductCarousel />
          ) : (
            <Link to="/">
              <p className="my-4">
                <i className="bx bxs-chevrons-left"></i>Go Back
              </p>
            </Link>
          )}
          <h3>LATEST PRODUCTS</h3>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="warning">{error}</Message>
          ) : (
            <>
              <Row className="px-2">
                {products.map((product) => (
                  <Col
                    key={product._id}
                    xs={6}
                    md={6}
                    lg={4}
                    xl={3}
                    className="px-2"
                  >
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
              <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ""}
              />
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default HomeScreen;
