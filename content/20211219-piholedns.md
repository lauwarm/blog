---
title: "Raspberry Pi and PiHole"
image: ""
date: 2021-12-19T15:24:21+01:00
draft: true
tags: ["raspberry pi", "dns", "pihole", "unbound"]
---

Setting up a Raspberry Pi 3B+ with PiHole.
I'm obvioulsy not the first one to write about the experience.
I will link to a lot of other Sites which helped me to achive this.

What I am trying to achive:
- Setup a Raspberry Pi (or two) with Ubuntu Server 20.04.3 LTS
- Get SSH access to the RPi via Keys instead of Password
- Install PiHole
- Use unbound as our upstream DNS instead of i.e. Google
- Realise that DoT and DoH exist
- Realise that not every Device respects our DNS Server
- Reroute all(?) DNS traffic through PiHole with the help of a Firewall
- Secure the Admin Interface with a nice Certificate

What One would need to achive something like this:
- A Raspberry Pi 3B+ or newer (or a VM... )
- A microSD Card (8GB should be sufficient)
- A Firewall (or Router which supports advanced features)
- Some Network knowledge would not hurt

First of all, here is the Information I used for this Post:
- [unlocator - How to Block Google DNS on Fritz Box](https://support.unlocator.com/article/204-how-to-block-google-dns-on-fritz-box)
- [derekseaman - Redirect hard coded DNS](https://www.derekseaman.com/2019/10/redirect-hard-coded-dns-to-pi-hole-using-ubiquiti-edgerouter.html)
- [scotthelme - Securing DNS](https://scotthelme.co.uk/securing-dns-across-all-of-my-devices-with-pihole-dns-over-https-1-1-1-1/)
- [scotthelme - Catching naughty Devices](https://scotthelme.co.uk/catching-naughty-devices-on-my-home-network/)
- [pi-hole - Recommended Strategy for Clients with hard coded DNS](https://discourse.pi-hole.net/t/recommended-strategy-for-clients-with-hard-coded-dns/22103)
- [pi-hole - Enabling HTTPS for your PiHole Web Interface](https://discourse.pi-hole.net/t/enabling-https-for-your-pi-hole-web-interface/5771)
- [pi-hole - Unbound](https://docs.pi-hole.net/guides/dns/unbound/)
- [netmeister - DoH, DoT](https://www.netmeister.org/blog/doh-dot-dnssec.html)

Alright let's get started.

<br /> 

## Setup a Raspberry Pi 3B+ with Ubuntu Server 20.04.3 LTS
We got our Raspberry Pi sitting on the Desk. And a microSD Card. A Ethernet Cable too? Some way to power up the Device would be nice.
Also some sort of Cardreader to flash the microSD Card with Ubuntu.

## Install PiHole
Pretty simple. One Line to auto install PiHole.

[PiHole Github](https://github.com/pi-hole/pi-hole/#one-step-automated-install) curl -sSL https://install.pi-hole.net | bash

## Install and configure unbound
[unbound Docs](https://docs.pi-hole.net/guides/dns/unbound/)