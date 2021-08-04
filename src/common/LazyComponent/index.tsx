import React, { Component } from "react";

// 组件懒加载通用封装
export default function asyncComponent(importComponent: any) {
  class AsyncComponent extends Component {
    state: { component: any } = {
      component: null,
    };
    async componentDidMount() {
      const { default: component } = await importComponent();
      this.setState({
        component,
      });
    }

    render() {
      const { component: Com } = this.state;
      return Com ? <Com {...this.props} /> : <div>资源加载中</div>;
    }
  }

  return AsyncComponent;
}
