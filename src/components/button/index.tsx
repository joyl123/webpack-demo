import React, { Component } from "react";
import classnames from "classnames";
import { isFunction }  from '@utils/index';
import "./index.less";

interface Props {
  /** 样式名 */
  className?: string;
  /** 类型 */
  type?: "normal" | "primary" | "danger" | "ghost";
  /** 是否禁用按钮 不触发点击事件 */
  disabled?: boolean;
  /** 是否直角按钮 */
  isRect?: boolean;
  /** 是否圆形按钮 */
  round?: boolean;
  /** 按钮文字*/
  buttonText: string;
  /** 点击事件 */
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  /** 禁用时的点击事件 */
  onDisabledClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}
interface State {
  channelStack: any[];
  page: number;
}
export default class Button extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  static defaultProps = {
    type: "normal",
    onClick: () => {},
  };
  onClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const { disabled, onClick, onDisabledClick } = this.props;
    if (disabled) {
      onDisabledClick && onDisabledClick(e);
      return;
    }
    if (isFunction(onClick)) {
      onClick(e);
    }
  };
  render() {
    const { className, type, isRect, buttonText, disabled, round } = this.props;
    return (
      <div
        className={classnames(
          "common-button",
          type,
          {
            rect: isRect,
            round,
            disabled,
          },
          className
        )}
        onClick={this.onClick}
      >
        <text className="button-text">{buttonText}</text>
      </div>
    );
  }
}
