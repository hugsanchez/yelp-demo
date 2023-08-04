const path = require("path");

const webpackConfig = {
  entry: {
    path: path.join(__dirname, "./src/index.js"),
  },
  output: {
    path: path.join(__dirname, "./public/dist"),
    filename: "main.js"
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ]
  }
};

module.exports = webpackConfig;