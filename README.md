# NPM Version Suffix

A tiny helper that automatically add or remove suffix to the version in the `package.json` of your NPM package.

## Usage

### CI/CD

This helper is useful for publishing a NPM package in your CI/CD pipeline.

If you apply git flow and you want to publish a beta version when a feature is merged into `development`, you need a script to automatically add suffix to the version. For example, you have a package and its latest version is `1.2.3`. You are preparing the next release `1.2.4`. For testing purposes, you want the pipeline could publish a beta version whenevern there is a new feature merged, e.g. `1.2.4-beta.1`, `1.2.4-beta.2`... The default value of the suffix is `-rc.`. You can change it by providing an environment variable `SUFFIX`.

```JSON
{
    "version": "1.2.4",
    "scripts": {
        "add-suffix": "cross-env SUFFIX=-beta. node ./node_modules/npm-version-suffix/run-add-suffix.js"
    }
}
```

In your CI/CD pipeline, you can run the following script between `build` and `publish`.

```bash
npm run add-suffix
// or
yarn add-suffix
```

### Node.JS

You can also use this help in any of your NodeJS project.

```js
const { addSuffix, removeSuffix } = require('npm-version-suffix');

// by defualt, the suffix is "-rc."
addSuffix();
// You can assing your own suffix.
addSuffix('-beta.');
```
