---
title: "Using Dev Container to switch between Computers"
image: ""
date: 2022-02-18T17:34:30Z
draft: false
tags: ["dev container", "blog", "docker"]
---

## Information used in this Post

- [Docker Docs - Dev Environments](https://docs.docker.com/desktop/dev-environments/)
- [Hugo + VSCode + Docker = ❤️](https://aarynsmith.com/posts/hugo-vscode-docker/)
- [Development containers with Visual Studio Code](https://zerokspot.com/weblog/2020/07/15/development-containers-with-visual-studio-code/)
- [Windows Permissions Error copying static files](https://discourse.gohugo.io/t/windows-permissions-error-copying-static-files/30676)
- [GPG Sign Commit when running in DevContainer](https://github.com/microsoft/vscode-remote-release/issues/72)
- [Github - pinentry-wsl-ps1](https://github.com/diablodale/pinentry-wsl-ps1)

## Purpose

I tried to get an dev container setup for my blog. Read through some articles and thought I share what helped me to get it running.

## .devcontainer

First we create a Folder called _.devcontainer_ at the root of our blog.
Inside it we create two Files. _devcontainer.json_ and _Dockerfile_.

### devcontainer.json

```json
// For format details, see https://aka.ms/devcontainer.json. For config options, see the README at:
// https://github.com/microsoft/vscode-dev-containers/tree/v0.217.4/containers/hugo
{
	"name": "mugenbatscha.me",
	"build": {
		"dockerfile": "Dockerfile",
		"args": {
			// Update VARIANT to pick hugo variant.
			// Example variants: hugo, hugo_extended
			// Rebuild the container if it already exists to update.
			"VARIANT": "hugo_extended",
			// Update VERSION to pick a specific hugo version.
			// Example versions: latest, 0.73.0, 0,71.1
			// Rebuild the container if it already exists to update.
			"VERSION": "0.92.0",
			// Update NODE_VERSION to pick the Node.js version: 12, 14
			"NODE_VERSION": "16",
		}
	},

	// Set *default* container specific settings.json values on container create.
	"settings": {
		"html.format.templating": true,
	},
	
	// Add the IDs of extensions you want installed when the container is created.
	"extensions": [
		"bungcip.better-toml",
		"davidanson.vscode-markdownlint"
	],

	// Use 'forwardPorts' to make a list of ports inside the container available locally.
	"forwardPorts": [
		1313
	],

	// Use 'postCreateCommand' to run commands after the container is created.
	// "postCreateCommand": "uname -a",

	// Comment out to connect as root instead. More info: https://aka.ms/vscode-remote/containers/non-root.
	"remoteUser": "node"
}
```

### Dockerfile

```docker
# Update the NODE_VERSION arg in docker-compose.yml to pick a Node version: 10, 12, 14
ARG NODE_VERSION=16
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${NODE_VERSION}

# VARIANT can be either 'hugo' for the standard version or 'hugo_extended' for the extended version.
ARG VARIANT=hugo_extended
# VERSION can be either 'latest' or a specific version number
ARG VERSION=v0.92.0

# Download Hugo
RUN apt-get update && apt-get install -y ca-certificates openssl git curl && \
    rm -rf /var/lib/apt/lists/* && \
    case ${VERSION} in \
    latest) \
    export VERSION=$(curl -s https://api.github.com/repos/gohugoio/hugo/releases/latest | grep "tag_name" | awk '{print substr($2, 3, length($2)-4)}') ;;\
    esac && \
    echo ${VERSION} && \
    case $(uname -m) in \
    aarch64) \
    export ARCH=ARM64 ;; \
    *) \
    export ARCH=64bit ;; \
    esac && \
    echo ${ARCH} && \
    wget -O ${VERSION}.tar.gz https://github.com/gohugoio/hugo/releases/download/v${VERSION}/${VARIANT}_${VERSION}_Linux-${ARCH}.tar.gz && \
    tar xf ${VERSION}.tar.gz && \
    mv hugo /usr/bin/hugo

# Hugo dev server port
EXPOSE 1313

# [Optional] Uncomment this section to install additional OS packages you may want.
#
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>

# [Optional] Uncomment if you want to install more global node packages
# RUN sudo -u node npm install -g <your-package-list-here>
```

## .vscode

For VS Code we need a Folder called _.vscode_ at the root of our blog. Inside we create _tasks.json_. This will give us the defined commands in the command palette.

### tasks.json

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Serve Drafts",
            "type": "shell",
            "command": "hugo server -D",
            "group": {
                "kind": "test",
                "isDefault": true
            },
            "isBackground": true,
        },
        {
            "label": "Build",
            "type": "shell",
            "command": "hugo --noTimes",
            "group": {
                "kind": "build",
                "isDefault": true
            },
        }
    ]
}
```

## Problems

### Error building with hugo

I encountered the Problem that running the _hugo_ command to build the blog exits with an error. It seems that you cannot sync modification time of files on an exFat Filesystem. Strange enough though, my drive is NTFS. I guess the dev container mounts it in a different way?

To solve this problem I used _hugo --noTimes_.

### Signed commit

Using VS Code to commit with gpg enabled just fails. One needs to pass the local gpg agent socket into the container. Haven't tried that. I just commit it with an external terminal which is not connected to the dev container.