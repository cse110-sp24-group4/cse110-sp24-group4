module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  mode: "development",
  entry: "./source/index.html",

  devServer: {
    static: {
      directory: "source",
    },
    compress: true,
    port: 9000,
  },
};
