require('@babel/register')({
  sourceMaps: false,
  configFile: false,
  babelrc: false,
  ignore: [/node_modules/],
  extensions: ['.jsx', '.js'],
  cache: true,
  presets: [['@babel/preset-env']],
});
