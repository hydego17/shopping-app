import React from "react";
import { css } from "@emotion/core";
import BarLoader from "react-spinners/BarLoader";

const custom = css`
  display: block;
  margin: 0 auto;
`;

const Loader = () => {
  return <BarLoader css={custom} />;
};

export default Loader;
