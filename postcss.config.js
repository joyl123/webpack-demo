module.exports = {
  loader: "postcss-loader",
//   plugins: {
//     "postcss-preset-env": {},
//   },
plugins:[
    require('postcss-preset-env')
]
};
