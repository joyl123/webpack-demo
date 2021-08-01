const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackBar = require("webpackbar");
const MycliConsolePlugin = require("../plugins/index.js");
const webpack = require("webpack");
//此处变量其实我没有配置好process.env.NODE_ENV
const isProductionMode = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProductionMode ? "production" : "development",
  resolve: {
    //import 这些后缀文件时 可以忽略后缀,查找文件的时候 从前往后依次匹配
    extensions: [".tsx", ".ts", ".js", ".json"],
    //alias :别名设置,
    alias: {
      "@src": path.resolve(__dirname, "../src"),
      "@components": path.resolve(__dirname, "../src/components"),
      "@utils": path.resolve(__dirname, "../src/utils"),
      "@styles": path.resolve(__dirname, "../src/styles"),
      "@types": path.resolve(__dirname, "../src/types"),
    },
    modules: ["node_modules"], // 指定Webpack 去哪些目录下寻找第三方模块，提升速度，其实默认 找的就是node_modules
    mainFields: ["main"], // package.json 中查找包的时候，优先去寻找 包里的package.json里main(脚本的执行入口)，如果没有配置，下一个mainFiles属性查找
    mainFiles: ["index"], //对应依赖的package.json 没有配置main 字段，甚至就没有package.json ,则直接寻找包里的名为index的文件
  },
  entry: {
    app: "./src/app.js",
  },
  output: {
    filename: "[name].[hash:8].js", // 打包后的文件名称+hash值
    path: path.resolve(__dirname, "../dist"), // 打包后的目录
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/, // jsx/js文件的正则
        exclude: /node_modules/, // 排除 node_modules 文件夹
        use: {
          // loader 是 babel
          loader: "babel-loader",
          options: {
            // babel 转义的配置选项
            babelrc: false,
            presets: [
              // 添加 preset-react
              require.resolve("@babel/preset-react"),
              [require.resolve("@babel/preset-env"), { modules: false }],
            ],
            cacheDirectory: true,
          },
        },
      },

      {
        test: /\.(less|css)$/,
        use: [
          //生产环境才做样式分离
          isProductionMode ? MiniCssExtractPlugin.loader : "style-loader",
          //无论开发还是生产 做样式抽离
          // MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 1 },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env", {}]],
              },
            },
          },
          "less-loader",
        ], // 从右向左解析原则
      },
      {
        test: /\.(png|jpg|txt|ico)$/,
        type: "asset/resource", //webpack5 拷贝文件，相当于 file-loader的作用
      },
      {
        test: /\.(tsx|ts)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          configFile: path.resolve(__dirname, "../tsconfig.json"),
        },
      },
    ],
    //不做解析处理，忽略的文件中 不应该含有 import, require, define 的调用，或任何其他导入机制，忽略大型的 library 可以提高构建性能
    noParse: /lodash/, //lodash内部没有第三方依赖，在构建的时候， 可以直接忽略，不另外花时间去解析它的依赖
  },
  plugins: [
    // 添加打包进度条
    // new WebpackBar(),

    new CleanWebpackPlugin({
      dry: false,
      cleanOnceBeforeBuildPatterns: ["../dist"],
      dangerouslyAllowCleanPatternsOutsideProject: true,
    }),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      filename: "index.html",
      inject: true,
    }),
    new MiniCssExtractPlugin({
      filename: "./css/common.css",
    }),
    new MycliConsolePlugin({
      dec: 1,
    }),
    // require("autoprefixer"),
    new webpack.DefinePlugin({
      //设置一个全局变量，实际业务场景下 至少我所负责过的使用场景是构建期间自动检测环境变化，切换我们的测试/生产环境接口
      COPYRIGHT: {
        AUTHOR: JSON.stringify("zoe"),
      },
    }),
    /**
     * 1:引入模块的路径的正则匹配
     * 2:模块的名称或者是引入的目录名称
     * 3:此处主要忽略多余的语言包的构建，测试结果 可以给包减少200kb左右体积大小（moment为例子）
     */
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    // new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),//效果类似上面的效果


  ],
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    hot: true,
    // port: 3000,
  },
};
