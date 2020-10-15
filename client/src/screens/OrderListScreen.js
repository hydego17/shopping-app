import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listOrders } from "../actions/orderActions";

//animation
import { AnimatePresence, motion } from "framer-motion";

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <>
          <h4>Orders</h4>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="warning">{error}</Message>
          ) : (
            <Table bordered responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USER</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      {/* eslint-disable-next-line */}
                      <Link to to={`/order/${order._id}`}>
                        {order._id}
                      </Link>
                    </td>
                    <td>{order.user && order.user.name}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>IDR {order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i className="fas fa-times"></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i className="fas fa-times"></i>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </>
      </motion.div>
    </AnimatePresence>
  );
};

export default OrderListScreen;
