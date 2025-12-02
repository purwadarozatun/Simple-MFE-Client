const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.js'),
  devServer: {
    port: 3001,
    historyApiFallback: true,
  },
  output: {
    publicPath: 'auto'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      { test: /\.(ts|tsx|js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { 
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'remote_form',
      filename: 'remoteEntry.js',
      exposes: {
        './RemoteForm': './src/RemoteForm.tsx',
        './PilihLokasi': './src/PilihLokasi.tsx',
        './PopupTest': './src/PopupTest.tsx'
      },
      shared: {
        react: { singleton: true, },
        'react-dom': { singleton: true,  },
        'react-hook-form': { singleton: true },
        leaflet: { singleton: true },
        'react-leaflet': { singleton: true },  // ⭐ INI PENTING!
  
      }
    }),
    new HtmlWebpackPlugin({ template: './public/index.html' })
  ]
};