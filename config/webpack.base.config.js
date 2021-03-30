const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//此处变量其实我没有配置好process.env.NODE_ENV
const isProductionMode = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProductionMode ? "production" : "development",
  resolve: {
    //import 这些后缀文件时 可以忽略后缀
    extensions: [".mjs", ".js", ".json", ".jsx", ".tsx", ".less"],
    alias: {
      "@src": path.resolve(__dirname, "../src"),
      "@components": path.resolve(__dirname, "../src/components"),
      "@utils": path.resolve(__dirname, "../src/utils"),
      "@styles": path.resolve(__dirname, "../src/styles"),
      '@constants': path.resolve(__dirname, '../src/constants'),
      '@/types': path.resolve(__dirname, '../src/types'),
    },
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
          isProductionMode ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: { importLoaders: 1 },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // 选项
                    },
                  ],
                ],
              },
            },
          },
          "less-loader",
        ], // 从右向左解析原则
      },
      {
        // test: /\.(png|jpe?g|gif)$/i,
        exclude: [
          /\.(js|mjs|jsx|ts|tsx)$/,
          /\.html$/,
          /\.json$/,
          /\.(css|less)$/,
        ],
        use: {
          loader: "file-loader",
          options: {
            name: "../static/media/[name].[hash:8].[ext]",
          },
        },
      },
      {
        test: /\.(tsx|ts)$/,
        // use: "ts-loader",
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          configFile: path.resolve(__dirname, "../tsconfig.json"),
        },
      },
    ],
  },
  plugins: [
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
    // require("autoprefixer"),
  ],
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    hot: true,
    port: 3000,
  },
};
