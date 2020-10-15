import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";

//animation
import { AnimatePresence, motion } from "framer-motion";

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    // Price calculation
    order.itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || order._id !== orderId || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });

      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, orderId, successPay, successDeliver, history, userInfo]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="warning">{error}</Message>
        ) : (
          <>
            <Link to="/admin/orderlist">
              <p className="my-4">
                <i className="bx bxs-chevrons-left"></i>Go Back
              </p>
            </Link>
            <div className="container">
              <h4>Order {order._id} </h4>
            </div>
            <Row>
              <Col md={8}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h4>Shipping</h4>

                    <div className="order-details">
                      <p>
                        <strong>Name: </strong>
                        {order.user.name}
                      </p>

                      <p>
                        <strong>Email: </strong>
                        <a href={`mailto:${order.user.email}`}>
                          {order.user.email}
                        </a>
                      </p>
                      <p>
                        <strong>Address: </strong>
                        {order.shippingAddress.address},{" "}
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.postalCode},{" "}
                        {order.shippingAddress.country}
                      </p>
                      {order.isDelivered ? (
                        <Message variant="info">
                          Delivered on {order.deliveredAt}
                        </Message>
                      ) : (
                        <Message variant="warning">Not Delivered</Message>
                      )}
                    </div>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <h4>Payment Method</h4>
                    <div className="order-details">
                      <p>
                        <strong>Method: </strong>
                        {order.paymentMethod}
                      </p>
                      {order.isPaid ? (
                        <Message variant="info">Paid on {order.paidAt}</Message>
                      ) : (
                        <Message variant="warning">Not Paid</Message>
                      )}
                    </div>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <h4>Order Items</h4>
                    {order.orderItems.length === 0 ? (
                      <Message> Order is empty</Message>
                    ) : (
                      <ListGroup variant="flush">
                        <div className="order-details">
                          {order.orderItems.map((item, index) => (
                            <ListGroup.Item key={index}>
                              <Row>
                                <Col md={2}>
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    fluid
                                  />
                                </Col>
                                <Col>
                                  <Link to={`/product/${item.product}`}>
                                    {item.name}
                                  </Link>
                                </Col>
                                <Col md={5}>
                                  {item.qty} x IDR {item.price} = IDR{" "}
                                  {item.qty * item.price}
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          ))}
                        </div>
                      </ListGroup>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={4}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h4>Order Summary</h4>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col> Items</Col>
                        <Col> idr {order.itemsPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col> Shipping</Col>
                        <Col> idr {order.shippingPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col> Tax</Col>
                        <Col> idr {order.taxPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col> Total</Col>
                        <Col> idr {order.totalPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    {!order.isPaid && (
                      <ListGroup.Item>
                        {loadingPay && <Loader />}
                        {!sdkReady ? (
                          <Loader />
                        ) : (
                          <PayPalButton
                            amount={order.totalPrice}
                            onSuccess={successPaymentHandler}
                          />
                        )}
                      </ListGroup.Item>
                    )}

                    {loadingDeliver && <Loader />}
                    {userInfo &&
                      userInfo.isAdmin &&
                      order.isPaid &&
                      !order.isDelivered && (
                        <ListGroup.Item>
                          <Button
                            type="btn"
                            className="btn btn-block"
                            onClick={deliverHandler}
                          >
                            Mark As Delivered
                          </Button>
                        </ListGroup.Item>
                      )}
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default OrderScreen;
