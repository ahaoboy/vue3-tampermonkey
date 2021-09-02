const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env = {}) => ({
  mode: env.prod ? "production" : "development",
  // devtool: env.prod ? "source-map" : "cheap-module-eval-source-map",
  devtool: env.prod ? "source-map" : "none",
  entry: path.resolve(__dirname, "./src/main.js"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/dist/",
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      // this isn't technically needed, since the default `vue` entry for bundlers
      // is a simple `export * from '@vue/runtime-dom`. However having this
      // extra re-export somehow causes webpack to always invalidate the module
      // on the first HMR update and causes the page to reload.
      vue: "@vue/runtime-dom",
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.png|wasm$/,
        use: {
          loader: "url-loader",
          options: { limit: 8192 * 1000 },
        },
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     {
      //       loader: MiniCssExtractPlugin.loader,
      //       options: {hmr: !env.prod}
      //     },
      //     'css-loader'
      //   ]
      // }
      {
        test: /\.css|\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new TerserPlugin({
      parallel: true,
      terserOptions: {
        ecma: 6,
      },
    }),
    ...(!env.prod
      ? []
      : [
          // new BundleAnalyzerPlugin(),
          new UglifyJsPlugin({
            uglifyOptions: {
              compress: {
                warnings: false,
                drop_console: true, //console
                pure_funcs: ["console.log", "console.error"], //移除console
              },
            },
            parallel: true,
          }),
        ]),
  ],
  devServer: {
    inline: true,
    hot: true,
    stats: "minimal",
    contentBase: __dirname,
    overlay: true,
  },
  // optimization: {
  //   minimizer: [
  //     (compiler) => {
  //       const TerserPlugin = require('terser-webpack-plugin');
  //       new TerserPlugin({ /* your config */ }).apply(compiler);
  //     }
  //   ],
  // },
});
