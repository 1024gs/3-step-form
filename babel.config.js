module.exports = (api) => {
  const isTest = api.env('test');

  return {
    presets: [
      [
        '@babel/preset-env',
        {useBuiltIns: false, modules: isTest ? 'cjs' : false},
      ],
    ],
    plugins: [
      ['@babel/plugin-transform-typescript', {isTSX: true}],
      ['@babel/plugin-transform-react-jsx', {pragma: 'React.createElement'}],
    ],
  };
};
