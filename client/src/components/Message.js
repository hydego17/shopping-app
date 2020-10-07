import React from "react";
import { Alert } from "react-bootstrap";
import { AnimatePresence, motion } from "framer-motion";

const Message = ({ variant, children }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Alert variant={variant}>{children}</Alert>
      </motion.div>
    </AnimatePresence>
  );
};

Message.defaultProps = {
  variant: "dark",
};

export default Message;
