const path = require("path");
const { merge } = require("webpack-merge");
const portfinder = require("portfinder");
const baseConfig = require("./webpack.base.config.js");

const devWebpackConfig = merge(baseConfig, {
  mode: "development",
  devtool: "inline-source-map",
});
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = 3001;
  //查找端口号
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      //端口被占用时就重新设置evn和devServer的端口
      process.env.PORT = port;
      devWebpackConfig.devServer.port = port;
      resolve(devWebpackConfig);
    }
  });
});
