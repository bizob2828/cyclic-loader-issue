# Circular Dep Repro w/ import-in-the-middle

This demonstrates an issue with `import-in-the-middle` and running with an application that contains circular dependencies.


## Reproduction

```sh
npm i
npm run start
echo $?
```

It prints out 13


## Expected Result

```sh
npm i
npm run start-no-loader
echo $?
```


It prints out

```
dep2
dep1
```

with an exit code of 0.


It's worth noting in Node 20 it provides more context, I think because of https://github.com/nodejs/loaders/issues/81#event-10351500101.

```sh
(node:15993) ExperimentalWarning: Custom ESM Loaders is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
dep2
file:///Users/revans/code/cyclic-loader-issue/dep-2.js:5
  dep1()
  ^

ReferenceError: Cannot access 'dep1' before initialization
    at dep2 (file:///Users/revans/code/cyclic-loader-issue/dep-2.js:5:3)
    at file:///Users/revans/code/cyclic-loader-issue/dep-1.js:7:1
    at ModuleJob.run (node:internal/modules/esm/module_job:217:25)
    at async ModuleLoader.import (node:internal/modules/esm/loader:308:24)
    at async loadESM (node:internal/process/esm_loader:42:7)
    at async handleMainPromise (node:internal/modules/run_main:66:12)
```
