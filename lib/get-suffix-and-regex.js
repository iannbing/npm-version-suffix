const escapeStringRegexp = require('escape-string-regexp');

// remove the leading dashes and trailing dots.
const extractCharactors = text =>
  text && text.replace(/^-+/, '').replace(/\.+$/, '');

const getSuffixAndRegex = providedSuffix => {
  const { SUFFIX = 'rc' } = process.env;
  const suffixCharactors = extractCharactors(providedSuffix) || SUFFIX;
  const suffix = `-${suffixCharactors}.`;
  const suffixRegex = escapeStringRegexp(suffix);
  return {
    suffix,
    suffixRegex
  };
};

module.exports = getSuffixAndRegex;
