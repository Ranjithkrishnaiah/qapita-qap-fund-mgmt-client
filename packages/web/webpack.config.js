const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');


const webpackConfig = (env) => ({
  entry: "./src/index.tsx",
  mode: "development",
  ...(env.production || !env.development ? {} : { devtool: "eval-source-map" }),
  resolve: {
    extensions: [
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      ".json",
      ".sass",
      ".scss",
      ".css",
      ".less",
    ],
    //TODO waiting on https://github.com/dividab/tsconfig-paths-webpack-plugin/issues/61
    //@ts-ignore
    //plugins: [new TsconfigPathsPlugin()]
  },
  output: {
    path: path.join(__dirname, "/dist"),
    publicPath: "/",
    filename: "build.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        },
        exclude: /dist|node_modules/,
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: "url-loader",
        },
      },

      // {
      //   test: /\.module\.s(a|c)ss$/,
      //   use: [
      //     'style-loader',
      //     'cache-loader',
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         modules: {
      //           localIdentName: '[name]__[local]--[hash:base64:5]',
      //         },
      //         localsConvention: 'dashesOnly',
      //         sourceMap: false, //TODO: Modify this on production. Make sourcemap false
      //       },
      //     },
      //     {
      //       loader: 'sass-loader',
      //       options: {
      //         sourceMap: false,
      //       },
      //     },
      //   ],
      // },
      // {
      //   test: /\.s(a|c)ss$/,
      //   exclude: /\.module.(s(a|c)ss)$/,
      //   use: [
      //     'cache-loader',
      //     //TODO: Modify this on production
      //     'style-loader',
      //     //isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
      //     'css-loader',
      //     {
      //       loader: 'sass-loader',
      //       options: {
      //         sourceMap: true,
      //       },
      //     },
      //   ],
      // },
      // {
      //   test: /\.(png|jp(e*)g|svg|woff(2)?|ttf|eot|pdf)(\?v=\d+\.\d+\.\d+)?$/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 8192,
      //       },
      //     },
      //   ],
      // },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        // { from: 'public/!(index\.html)' }
        {
          from: "public/*.*",
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ["**/index.html"],
          },
          to: '[name][ext]'
        }
      ]
    }),
    new HtmlWebpackPlugin({
      title: "qapita-fund",
      template: "./public/index.html",
      favicon: "./src/favicon.ico",
    }),
    new webpack.DefinePlugin({
      "process.env.PRODUCTION": env.production || !env.development,
      "process.env.NAME": JSON.stringify(require("./package.json").name),
      "process.env.VERSION": JSON.stringify(require("./package.json").version),
    }),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: "./src/**/*.{ts,tsx,js,jsx}", // required - same as command "eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx"
      },
    }),
    // new webpack.DefinePlugin({
    //   'process.env': JSON.stringify(process.env),
    //   // 'process.env.MY_ENV': JSON.stringify(process.env),

    // })
    new webpack.DefinePlugin({
      "process.env": JSON.stringify("development"),
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
});

module.exports = webpackConfig;
