---
title: "Raspberry Pi, Pi-hole and Unbound"
image: ""
date: 2021-12-19T15:24:21+01:00
draft: false
tags: ["raspberry pi", "dns", "pihole", "unbound"]
---

Setting up a Raspberry Pi 3B+ with Pi-hole and Unbound to serve as our local DNS Server.

What I am trying to achive:

- Install Pi-hole and Unbound
- Configure Pi-hole and Unbound as our own upstream DNS Server
- Realise that not every Device respects our DNS Server
- Realise that DoT and DoH exist
- Reroute most DNS traffic through Pi-hole with the help of a Firewall

## Information used in this Post

- [unlocator - How to Block Google DNS on Fritz Box](https://support.unlocator.com/article/204-how-to-block-google-dns-on-fritz-box)
- [derekseaman - Redirect hard coded DNS](https://www.derekseaman.com/2019/10/redirect-hard-coded-dns-to-pi-hole-using-ubiquiti-edgerouter.html)
- [scotthelme - Securing DNS](https://scotthelme.co.uk/securing-dns-across-all-of-my-devices-with-pihole-dns-over-https-1-1-1-1/)
- [scotthelme - Catching naughty Devices](https://scotthelme.co.uk/catching-naughty-devices-on-my-home-network/)
- [pi-hole - Recommended Strategy for Clients with hard coded DNS](https://discourse.pi-hole.net/t/recommended-strategy-for-clients-with-hard-coded-dns/22103)
- [pi-hole - Enabling HTTPS for your PiHole Web Interface](https://discourse.pi-hole.net/t/enabling-https-for-your-pi-hole-web-interface/5771)
- [pi-hole - Unbound](https://docs.pi-hole.net/guides/dns/unbound/)
- [netmeister - DoH, DoT](https://www.netmeister.org/blog/doh-dot-dnssec.html)

## Install Pi-hole

Pretty simple. One Line to auto install [PiHole](https://github.com/pi-hole/pi-hole/#one-step-automated-install)

```bash
curl -sSL https://install.pi-hole.net | bash
```

## Install Unbound

```bash
sudo apt install unbound
```

## Configure Unbound

Create config file:

```bash
sudo vi /etc/unbound/unbound.conf.d/pi-hole.conf
```

Add content:

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

    #root-hints: "/var/lib/unbound/root.hints"

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

Restart Service:

```bash
sudo service unbound restart
```

Unbound should now be able to perform DNS resolving:

```bash
dig pi-hole.net @127.0.0.1 -p 5335
```

## Configure Pi-hole

Under _Settings_ navigate to _DNS_.

We add our unbound DNS Server:

```bash
Custom 1 (IPv4): 127.0.0.1#5335
```

We can uncheck Google upstream DNS Servers.

## Hard coded DNS, DoT, DoH and Firewalls

A Device might have it's DNS Server hard coded. Or it might use DNS over TLS. With a Firewall we can force the query to still be resolved by Pi-hole. We need to redirect all outgoing TCP and UDP traffic to Pi-hole.

DoH masks DNS traffic by using HTTPS. Currently the approach is to block this kind of traffic by using an IP List from Github.

Under the first Section one can find a lot more information regarding this Topic.
Information about how DoT and DoH work. How to setup a Ubiquiti Firewall to redirect Traffic.
