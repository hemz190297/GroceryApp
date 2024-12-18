module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['@babel/plugin-transform-runtime', {
      "regenerator": true
    }],
    'react-native-reanimated/plugin',
  ]
};
