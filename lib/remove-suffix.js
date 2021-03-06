const replace = require('replace-in-file');

const getSuffixAndRegex = require('./get-suffix-and-regex');

const {
  packageJsonPath,
  version,
  name,
  suffix,
  suffixRegex
} = require('./import-package');

const removeSuffix = providedSuffix => {
  const { suffix, suffixRegex } = getSuffixAndRegex(providedSuffix);
  const releaseVersion = version.split(suffix)[0];

  replace.sync({
    files: packageJsonPath,
    from: new RegExp(`\"version\": \"(\d|\.|(${suffixRegex}))+\",`, 'g'),
    to: `"version": "${releaseVersion}",`
  });
};

module.exports = removeSuffix;
