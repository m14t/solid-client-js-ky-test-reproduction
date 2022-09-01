# Reproduction of `ky-universal` issue in Node 18

While trying to use `@inrupt/solid-client@1.23.3`, I observed that I can no longer run my unit tests on Node v18.x. This repository is a minimum setup to reproduce the issue.

## Error

When attempting to call `createThing` in Node 18, the following error is thrown

```
$ CI=true npm test

> solid-client-js-ky-test-reproduction@0.1.0 test
> react-scripts test

FAIL src/issue-reproduction.test.js
  ● Test suite failed to run

    /path/to/solid-client-js-ky-test-reproduction/node_modules/ky-universal/node_modules/node-fetch/src/utils/form-data.js:1
    ReferenceError: Buffer is not defined

      at Object.<anonymous> (node_modules/ky-universal/node_modules/node-fetch/src/utils/form-data.js:7:24)

Test Suites: 1 failed, 1 total
Tests:       0 total
Snapshots:   0 total
Time:        1.309 s
Ran all test suites.
```

Dependency tree that leads to this code:

```
$ npm ls node-fetch
solid-client-js-ky-test-reproduction@0.1.0 /Users/mfarmer/Sites/inrupt/solid-client-js-ky-test-reproduction
└─┬ @inrupt/solid-client@1.23.3
  ├─┬ cross-fetch@3.1.5
  │ └── node-fetch@2.6.7
  └─┬ jsonld@5.2.0
    └─┬ @digitalbazaar/http-client@1.2.0
      └─┬ ky-universal@0.8.2
        └── node-fetch@3.0.0-beta.9
```

## Steps to create this repository

```bash
$ node -v
v18.8.0

# Use Create React App to create the repo
$ REPO_NAME=solid-client-js-ky-test-reproduction
$ npx create-react-app ${REPO_NAME} --template typescript
$ cd ${REPO_NAME}

# Remove unused files
$ rm -rf src/* public README.md

# Add dependencies
$ npm i buffer @inrupt/solid-client

# Create the test file
$ cat >src/issue-reproduction.test.js <<EOF
import { createThing } from "@inrupt/solid-client";

test("calling createThing should not throw an error", () => {
  createThing({ url: "http://test.com" });
});
EOF

# Run the test
$ CI=true npm test
```
