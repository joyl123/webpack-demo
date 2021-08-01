import React, { Component } from "react";
import classnames from "classnames";
import { isFunction } from "@utils/index";

interface Props {
  className?: string;
}

const Button: React.FC<Props> = (props: Props) => {
  const { className } = props;
  return <button className={classnames("btn", className)}>我是一个button</button>;
};
export default Button;
