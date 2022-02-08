---
title: "Install Telegraf on Raspberry Pi"
image: ""
date: 2021-12-22T13:32:21+01:00
draft: false
tags: ["raspberry pi", "telegraf", "monitoring", "grafana"]
---

Some Notes and Links on how to get Telegraf running on a Raspberry Pi 3B+.

## Information used in this Post
- https://docs.influxdata.com/telegraf/v1.21/introduction/installation/
- https://docs.influxdata.com/telegraf/v1.21/introduction/getting-started/

## Install Telegraf
First we select "Ubuntu & Debian" tab.

Then we use the curl command to add the repository

```
curl -s https://repos.influxdata.com/influxdb.key | sudo tee /etc/apt/trusted.gpg.d/influxdb.asc >/dev/null

source /etc/os-release

echo "deb https://repos.influxdata.com/${ID} ${VERSION_CODENAME} stable" | sudo tee /etc/apt/sources.list.d/influxdb.list

sudo apt-get update && sudo apt-get install telegraf
```

## Copy Configuration File
Next we copy our own `telegraf.conf` into `/etc/telegraf/`

```
sudo cp telegraf.conf /etc/telegraf/telegraf.conf
```

## Restart Service
We finish with restarting the telegraf service

```
sudo systemctl restart telegraf.serive
```