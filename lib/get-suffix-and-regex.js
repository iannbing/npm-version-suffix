const escapeStringRegexp = require('escape-string-regexp');

const getSuffixAndRegex = providedSuffix => {
  const { SUFFIX = '-rc.' } = process.env;
  const suffix = providedSuffix || SUFFIX;
  const suffixRegex = escapeStringRegexp(suffix);
  return {
    suffix,
    suffixRegex
  };
};

module.exports = getSuffixAndRegex;
