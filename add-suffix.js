'use strict';

const execa = require('execa');
const replace = require('replace-in-file');

const { packageJsonPath, version, name } = require('./lib/import-package');
const getSuffixAndRegex = require('./lib/get-suffix-and-regex');

const addSuffix = providedSuffix => {
  const { suffix, suffixRegex } = getSuffixAndRegex(providedSuffix);

  const { stdout } = execa.shellSync(`npm view ${name} versions`);
  const allBetaVersions = JSON.parse(stdout.replace(/'/g, '"'))
    .filter(v => v.includes(`${version}${suffix}`))
    .map(v => +v.split(suffix)[1])
    .sort((a, b) => b - a);

  const latestBeta = allBetaVersions[0];
  const newBetaVersion = `${version}${suffix}${
    latestBeta ? latestBeta + 1 : 1
  }`;

  replace.sync({
    files: packageJsonPath,
    from: new RegExp(`\"version\": \"(\d|\.|(${suffixRegex}))+\",`, 'g'),
    to: `"version": "${newBetaVersion}",`
  });
};

module.exports = addSuffix;
