module.exports = function(api) {
  api.cache(true);
  const presets = [
    [
      '@babel/preset-env',
      {
        modules: 'auto',
        targets: {node: 'current'},
        useBuiltIns: 'entry'
      }
    ],
    '@babel/react',
    '@babel/preset-flow',
    '@babel/preset-typescript',
  ];
  const plugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/transform-runtime',
    'add-module-exports',
    'babel-plugin-dynamic-import-node'
  ];

  return {
    presets,
    plugins
  };
};