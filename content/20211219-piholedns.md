---
title: "Raspberry Pi, Pi-hole, Unbound"
image: ""
date: 2021-12-19T15:24:21+01:00
draft: false
tags: ["raspberry pi", "dns", "pihole", "unbound"]
---

Installing Pi-hole and Unbound on a Raspberry Pi. This Post assumes one has already a Raspberry Pi up and running with Ubuntu Server 20.04.3 LTS.

What I am trying to achive:
- Install Pi-hole
- Install Unbound
- Configure Unbound
- Configure Pi-hole to se unbound as our upstream DNS instead of i.e. Google
- Realise that not every Device respects our DNS Server
- Realise that DoT and DoH exist
- Reroute most DNS traffic to Pi-hole with the help of a Firewall


## Information used in this Post
- [unlocator - How to Block Google DNS on Fritz Box](https://support.unlocator.com/article/204-how-to-block-google-dns-on-fritz-box)
- [derekseaman - Redirect hard coded DNS](https://www.derekseaman.com/2019/10/redirect-hard-coded-dns-to-pi-hole-using-ubiquiti-edgerouter.html)
- [scotthelme - Securing DNS](https://scotthelme.co.uk/securing-dns-across-all-of-my-devices-with-Pi-hole-dns-over-https-1-1-1-1/)
- [scotthelme - Catching naughty Devices](https://scotthelme.co.uk/catching-naughty-devices-on-my-home-network/)
- [pi-hole - Recommended Strategy for Clients with hard coded DNS](https://discourse.pi-hole.net/t/recommended-strategy-for-clients-with-hard-coded-dns/22103)
- [pi-hole - Enabling HTTPS for your Pi-hole Web Interface](https://discourse.pi-hole.net/t/enabling-https-for-your-pi-hole-web-interface/5771)
- [pi-hole - Unbound](https://docs.pi-hole.net/guides/dns/unbound/)
- [netmeister - DoH, DoT](https://www.netmeister.org/blog/doh-dot-dnssec.html)


## Install Pi-hole
Pretty simple. One line to auto install [Pi-hole](https://github.com/pi-hole/pi-hole/#one-step-automated-install) .

```bash
curl -sSL https://install.pi-hole.net | bash
```

## Install Unbound
Installing [Unbound](https://docs.pi-hole.net/guides/dns/unbound/) is straight forward on Ubuntu.

```bash
sudo apt install unbound
```

## Configure Unbound
After installation finished we need to create a configuration file for unbound.
The [Pi-hole documentation](https://docs.pi-hole.net/guides/dns/unbound/) has a config file at hand.
We can just copy this one.

First we create a new file:
```bash
sudo vi /etc/unbound/unbound.conf.d/pi-hole.conf
```
Paste the content into it:
```bash
server:
    # logfile: "/var/log/unbound/unbound.log"
    verbosity: 0

    interface: 127.0.0.1
    port: 5335
    do-ip4: yes
    do-udp: yes
    do-tcp: yes

    do-ip6: no

    prefer-ip6: no

    harden-glue: yes

    harden-dnssec-stripped: yes

    use-caps-for-id: no

    edns-buffer-size: 1232

    prefetch: yes

    num-threads: 1

    so-rcvbuf: 1m

    private-address: 192.168.0.0/16
    private-address: 169.254.0.0/16
    private-address: 172.16.0.0/12
    private-address: 10.0.0.0/8
    private-address: fd00::/8
    private-address: fe80::/10
```

Save and Quit:
```bash
ESC
:wq
Enter
```

Restart the Unbound Service:
```bash
sudo service unbound restart
```

Now we have unbound running and accepting local requests.


## Configure Pi-hole
- Login to our Pi-hole instance
- Settings
    - DNS
        - Upstream DNS Server
            - Custom 1 (IPv4) : 127.0.0.1#5335

We could also uncheck Google DNS.

## DoT, DoH and hard coded DNS
A Device may have it's DNS information hard coded. It will never query Pi-hole.
To prevent this, we need a Firewall capable of redirecting all DNS traffic to Pi-hole.
Obviously YMMV because there are a lot of different Firewalls.
At the beginning of this Post are two Links which should point you to the correct solution.

Generally speaking, we need to monitor TCP and UDP trying to leave our outbound Interface.
We would redirect this traffic to our Pi-hole IP and Port.

DoT, which stands for DNS over TLS, uses Port 853. 
In Theory we should be able to redirect this traffic to Pi-hole as well.

A Problem arises with DoH, which stands for DNS over HTTPS.
The DNS query will be send on Port 443. Like everything else. A simple redirect will not be sufficient.
The current approach is to download a IP List from Github and block DoH requests.

[This Link](https://www.netmeister.org/blog/doh-dot-dnssec.html) will provide a lot more Information about DoT and DoH.

