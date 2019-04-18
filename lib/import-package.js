const path = require('path');

const packageJsonPath = path.join(process.cwd(), 'package.json');
const { version, name } = require(packageJsonPath);

module.exports = {
  packageJsonPath,
  version,
  name
};
