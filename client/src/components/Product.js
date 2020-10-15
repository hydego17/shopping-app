import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="card my-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong className="product-name py-3">{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating
            value={product.rating}
            // text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as="h5" className="product-price">
          IDR {product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
