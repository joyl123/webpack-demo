const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackBar = require("webpackbar");
const MycliConsolePlugin = require("../plugins/index.js");
const webpack = require("webpack");
const speedMeasureWebpackPlugin = require("speed-measure-webpack-plugin"); //打印各个模块编译的具体费时
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer"); //分析文件大小
const PurgecssWebpackPlugin = require("purgecss-webpack-plugin");
const { glob } = require("glob");
const smw = new speedMeasureWebpackPlugin();
//此处变量其实我没有配置好process.env.NODE_ENV
const isProductionMode = process.env.NODE_ENV === "production";
const PATHS = {
  src: path.join(__dirname, "src"),
};
// smw.wrap()
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
      "@pages": path.resolve(__dirname, "../src/pages"),
      "@common": path.resolve(__dirname, "../src/common"),
    },
    modules: ["node_modules"], // 指定Webpack 去哪些目录下寻找第三方模块，提升速度，其实默认 找的就是node_modules
    mainFields: ["main"], // package.json 中查找包的时候，优先去寻找 包里的package.json里main(脚本的执行入口)，如果没有配置，下一个mainFiles属性查找
    mainFiles: ["index"], //对应依赖的package.json 没有配置main 字段，甚至就没有package.json ,则直接寻找包里的名为index的文件
  },
  entry: {
    app: "./src/app.js",
  },
  // 效果:首次打包  8505 ms 二次打包4096 ms
  cache: {
    type: "filesystem",//'memory'｜'filesystem'
    cacheDirectory: path.resolve(__dirname, "../node_modules/.cache/webpack"),
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
        use: [
          {
            loader: "thread-loader", //开启多进程打包，但只有真的大文件才有用 ，至少 当前的demo下 打包反而更慢了
            options: {
              workers: 3,
            },
          },
          {
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
              // cache-loader:同样也可以
              cacheDirectory: true, //开启缓存，babel在转义js文件过程中消耗性能较高，将babel-loader结果缓存起来，重新打包构建的时候会读取缓存，从而提高构建速度，降低消耗
            },
          },
        ],
      },

      {
        test: /\.(less|css)$/,
        exclude: /node_modules/,
        use: [
          // //生产环境才做样式分离
          // isProductionMode ? MiniCssExtractPlugin.loader : "style-loader",
          //无论开发还是生产 做样式抽离
          // MiniCssExtractPlugin.loader,

          { loader: MiniCssExtractPlugin.loader },
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
        type: "asset/resource", //webpack5 新用法，相当于 file-loader的作用
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
    //包大小分析
    // new BundleAnalyzerPlugin(),

    // 添加打包进度条,后改为使用自己的写的plugin
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
      filename: "[name].css",
    }),
    // new PurgecssWebpackPlugin({
    //   //扫描src下所有未使用到的css 的清理
    //   paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }), //// 不匹配目录，只匹配文件
    // }),
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
  experiments: {
    //       启用试验性的支持
    asset: true, //支持asset
  },
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    hot: true,
    // port: 3000,
  },
};
