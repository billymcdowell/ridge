const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (config, options) => {
  // Add vanilla-extract plugin
  config.plugins = [
    ...config.plugins,
    new VanillaExtractPlugin(),
    new MiniCssExtractPlugin(),
  ];

  // Add vanilla-extract loader for .css.ts files
  config.module.rules.unshift({
    test: /\.css\.ts$/,
    use: [
      {
        loader: require.resolve('@vanilla-extract/webpack-plugin/loader'),
      },
    ],
    exclude: /node_modules/,
  });

  // Handle the generated .vanilla.css files
  config.module.rules.unshift({
    test: /\.vanilla\.css$/i,
    use: [
      options.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
      'css-loader',
    ],
  });

  return config;
};
