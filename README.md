# NPM Version Suffix

A tiny helper that automatically add or remove suffix to the version in the `package.json` of your NPM package.

## The Problem

This helper is useful for publishing a NPM package with your CI/CD pipeline.

Imagine that you are preparing for a new release `1.2.3` with a bunch of features. When a feature is merged into a stable branch, e.g. `development`, You might want to publish a beta version (e.g. `1.2.3-beta.1` or `1.2.3-rc.2`). If all the features are in place, merge `development` into `master` and then publish `1.2.3` as an official release.

Normally you could apply Continuous Integration with pipelines. But CD is a bit tricky: the version number is manually added, which means that you cannot simply add `publish` as part of your pipeline. In order to enable Continuous Delivery, you need an automated process to increment the beta version number.

## Usage

This tool can automatically add suffix to the version in the `package.json`. The default suffix is `-rc.`. You can change it by providing an environment variable `SUFFIX` as follows:

```JSON
{
    "version": "1.2.3",
    "scripts": {
        "add-suffix": "cross-env SUFFIX=beta node ./node_modules/npm-version-suffix/run-add-suffix.js",
        "remove-suffix": "cross-env SUFFIX=beta node ./node_modules/npm-version-suffix/run-remove-suffix.js"
    }
}
```

In your CI/CD pipeline, you can run the following script between `build` and `publish`.

```bash
npm run add-suffix
// or
yarn add-suffix
```

You probablly don't really need `run-remove-suffix`, but it might be handy sometimes :-)

This tool will get the latest beta version of `1.2.3`, e.g. `1.2.3-rc.7` from the npm registry of your package, and then change the version of the current job to `1.2.3-rc.8`, and then the pipeline can continue to publish.

### Node.JS

You can also use this helper in any of your NodeJS project.

```js
const { addSuffix, removeSuffix } = require('npm-version-suffix');

// by defualt, the suffix is "-rc."
addSuffix();
// You can assing your own suffix.
addSuffix('alpha');  // 1.2.3-alpha.1
// It will remove unnecessary leading dashes and trailing dots
addSuffix('--beta..);   // still "1.2.3-beta.3"
```
