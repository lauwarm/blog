---
title: "Synology, DNS, Reverse Proxy for *.home.arpa"
image: ""
date: 2021-12-05T16:21:45+01:00
draft: false
tags: ["nas", "synology", "dns", "reverse proxy"]
---

## Pre
- Synology DSM 7.0.1-42218
- DNS Server from the "Package Center" needs to be installed.
- Reverse Proxy can be found under "Control Panel -> Login Portal -> Advanced"

## Domain
- We need a Domain
   - *home.arpa* is the Domain we are using for Home purposes - https://datatracker.ietf.org/doc/html/rfc8375

## DNS
- DNS Server
    - Zones -> Create -> Master zone
        - Domain type: Forward zone
        - Domain name: home.arpa
        - Master DNS server: Synology IP Address
        - Serial format: Integer
        - Limit zone transer: check
        - Limit source IP service: uncheck
        - Enable slave zone notification: uncheck
        - Limit zone update: check
    - Resolution
        - Enable resolution service: check
        - Limit source IP service: uncheck
        - Enable forwarders
            - Forwarder 1: 1.1.1.1
            - Forwarder 2: 8.8.8.8
            - Forward policy: Forward first

Now we can configure the "resource records".

Let us assume Plex is running as a Docker Container on the Nas.

The IP of the Nas is 192.168.0.10. Plex uses 192.168.0.10:32400.

First we create two more "Resource Records".
- CNAME type
    - Name: *
    - TTL: 86400
    - Canonical name: home.arpa
- A type
    - Name: 
    - TTL: 86400
    - IP address: 192.168.0.10

With this setup every Subdomain of home.arpa points to 192.168.0.10,
e.g. a.home.arpa, b.home.arpa and plex.home.arpa.

## Reverse Proxy
Now we need to configure the reverse Proxy.
- Control Panel -> Login Portal -> Advanced -> Reverse Proxy
- Create
    - Source
        - Reverse Proxy Name: plex
        - Protocol: HTTP
        - Hostname: plex.home.arpa
        - Port: 80
    - Destination
        - Protocol: HTTP
        - Hostname: 192.168.0.10
        - Port 32400

#
We need to manually specify the DNS Server on our Computer.
Set it to our Nas IP, e.g. 192.168.0.10.

Now we should be able to use plex.home.arpa instead of 192.168.0.10:32400/web/index.html#!/.