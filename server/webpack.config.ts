import { resolve } from 'path'
import nodeExternals from 'webpack-node-externals'
import TerserPlugin from 'terser-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import NodemonWebpackPlugin from 'nodemon-webpack-plugin'
import DotenvWebpackPlugin from 'dotenv-webpack'
import type { Configuration, WebpackPluginInstance } from 'webpack'

const isProd = process.env.NODE_ENV === 'production'

const config: Configuration = {
  target: 'node',
  mode: isProd ? 'production' : 'development',
  entry: resolve(__dirname, 'index.ts'),
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'server.js',
    // Clear the directory before building
    clean: true,
  },
  // Disable source maps for production
  devtool: isProd ? false : 'inline-source-map',
  // Need to watch to restart the server on changes with nodemon
  watch: !isProd,
  // Specify node dependencies to exclude from the bundle to prevent errors
  externals: [nodeExternals()],
  optimization: {
    minimize: isProd,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        minify: TerserPlugin.esbuildMinify,
      }),
    ],
  },
  // Specify the file extensions to resolve to avoid having to specify them in imports
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts'],
    alias: {
      '@': resolve(__dirname, '.'),
    },
  },
  // Specify the loaders to use to process the files
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'esbuild-loader',
        options: {
          loader: 'ts',
          target: 'es2018',
        },
      },
    ],
  },
  // Specify the plugins to use to process the bundle
  plugins: [
    new DotenvWebpackPlugin({ systemvars: true }),
    // Watches the files and restarts the server on changes
    isProd
      ? undefined
      : new NodemonWebpackPlugin({
          ext: '.ts',
          watch: ['./**/*'],
        }),
    // Runs type checking in a separate process to improve performance
    new ForkTsCheckerWebpackPlugin(),
  ].filter(Boolean) as WebpackPluginInstance[],
}

export default config
