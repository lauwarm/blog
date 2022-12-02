---
title: "Oryx has failed to build the solution"
image: ""
date: 2022-11-29T08:01:30Z
draft: false
tags: ["docker", "azure", "github action", "blog", "development"]
---

The wonders of Github Actions and Azure.

You decide to create a website with [Hugo](https://gohugo.io/).
You think [Azure Static Web Apps](https://azure.microsoft.com/en-us/products/app-service/static/#overview) is a good place to host your website.
You setup a [Github Action](https://github.com/features/actions) to automatically build and deploy your website.
You add [Dependabot](https://github.com/dependabot) for some peace of mind regarding dependency updates.

And You looked upon all that you made, and it was very good.

One fine day though, you wake up to this:

```bash
Start building sites … 
hugo v0.96.0-2fd4a7d3d6845e75f8b8ae3a2a7bd91438967bbb+extended linux/amd64 BuildDate=2022-03-26T09:15:58Z VendorInfo=gohugoio
Error: Error building site: POSTCSS: failed to transform "css/style.css" (text/css): node:internal/errors:478
    ErrorCaptureStackTrace(err);
    ^

SystemError [ERR_SYSTEM_ERROR]: A system error occurred: uv_os_homedir returned ENOENT (no such file or directory)
    at Object.<anonymous> (/opt/nodejs/16.18.0/lib/node_modules/npm/node_modules/clean-stack/index.js:6:61)
    at Module._compile (node:internal/modules/cjs/loader:1155:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1209:10)
    at Module.load (node:internal/modules/cjs/loader:1033:32)
    at Function.Module._load (node:internal/modules/cjs/loader:868:12)
    at Module.require (node:internal/modules/cjs/loader:1057:19)
    at require (node:internal/modules/cjs/helpers:103:18)
    at Object.<anonymous> (/opt/nodejs/16.18.0/lib/node_modules/npm/node_modules/aggregate-error/index.js:3:20)
    at Module._compile (node:internal/modules/cjs/loader:1155:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1209:10) {
  code: 'ERR_SYSTEM_ERROR',
  info: {
    errno: -2,
    code: 'ENOENT',
    message: 'no such file or directory',
    syscall: 'uv_os_homedir'
  },
  errno: [Getter/Setter],
  syscall: [Getter/Setter]
}
Total in 259 ms


---End of Oryx build logs---
Oryx has failed to build the solution.
```

Not the kind of logfile you want to wake up to.

Searching the vast amount of Github brings us to:
[Hugo builds from GitHub Actions stopped working #979](https://github.com/Azure/static-web-apps/issues/979)

>@georgechang Hey George, sorry for the
 inconvenience here; taking a look at your package.json, I see that you have your engines.node field set to ">=14", which tells Oryx to use the latest version of node that's 14 or greater. In this case, it's still picking up the latest version we support, node 18.x.x, so to try and force the version back to 14.x.x, which was the previous default in SWA tooling, I would set the engines.node to "14.x". Would you mind giving that a try and letting us know if that resolves the issue?

Thanks to _cormacpayne_ we should be able to resolve this error fairly quickly.

The [_npm Docs_](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#engines) show us how to use a specific _Node_ version.

Taking a look at my previous Github Actions logfiles I can see that the last _Node_ version to successfully build my site is _v14.19.1_.

I add the following to my _package.json_:

```json
{
  "engines": {
    "node": "14.19.1"
  }
}
```

Github Actions is able to build the website again.
The logfile shows that Oryx is using the specified version of _Node_.

```bash
---Oryx build logs---

Detecting platforms...
Detected following platforms:
  nodejs: 14.19.1
  hugo: 0.96.0

Start building sites … 

---End of Oryx build logs---
Finished building app with Oryx

Deployment Complete :)
```

All is very good, again.
