const path = require('path');
const isProduction = process.env.NODE_ENV === 'production';
const SRC = path.resolve(__dirname, '../src');

exports.getSrcPath = function(src) {
  return path.join(SRC, src);
};

exports.getConfigPath = function(src) {
  return path.join(path.resolve(__dirname), src);
};

exports.isProduction = isProduction;
