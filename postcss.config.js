// require("autoprefixer"),
// module.exports = {
//   loader: "postcss-loader",
// //   plugins: {
// //     "postcss-preset-env": {},
// //   },
// plugins:[
//     require('postcss-preset-env')
// ]
// };
module.exports = {
  plugins: {
    // autoprefixer: {
    //   remove: false,
    //   browsers: ["iOS >= 8", "Android >= 4"],
    // },
    "postcss-pxtorem": {
      rootValue: 20,
      propWhiteList: [],
    },
  },
};
