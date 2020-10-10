import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";

//animation
import { AnimatePresence, motion } from "framer-motion";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <CheckoutSteps step1 step2 step3 />
        <FormContainer>
          <h3>Payment Method</h3>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label as="legend">Select Method</Form.Label>

              <Col>
                <Form.Check
                  type="radio"
                  label="PayPal or Credit Card"
                  id="PayPal"
                  name="PaymentMethod"
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
              </Col>
            </Form.Group>

            <Button type="submit">Continue</Button>
          </Form>
        </FormContainer>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaymentScreen;
