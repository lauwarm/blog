---
title: "Raspberry Pi 3B+ and Ubuntu Server 20.04.3 LTS"
image: ""
date: 2021-12-18T11:55:34+01:00
draft: false
tags: ["raspberry pi", "ubuntu", "server", "lts", "ssh", "firewall", "putty"]
---

This Post is more of a stub. Using different Sources to get a Raspberry Pi 3B+ setup as a Ubuntu Server to install PiHole.

I will be using [Raspberry Pi Imager](https://www.raspberrypi.com/software/) to download [Ubuntu Server 20.04.3 LTS](https://ubuntu.com/download/raspberry-pi) and install it on the microSD Card. 
The Ubuntu Website has a Tutorial to get you started: [How to install Ubuntu Server on your Raspberry Pi](https://ubuntu.com/tutorials/how-to-install-ubuntu-on-your-raspberry-pi#1-overview). Especially helpful if you require Wifi instead of Ethernet. 

## Information used in this Post
- [My first 5 Minutes On A Server; Or, Essential Security for Linux Servers](https://sollove.com/2013/03/03/my-first-5-minutes-on-a-server-or-essential-security-for-linux-servers/)
- [How To Use SSH Keys on Windows Clients](https://support.hostway.com/hc/en-us/articles/115001509884-How-To-Use-SSH-Keys-on-Windows-Clients-with-PuTTY-)
- [How to install Ubuntu Server on your Raspberry Pi](https://ubuntu.com/tutorials/how-to-install-ubuntu-on-your-raspberry-pi#1-overview)
- [SSH AllowUsers from particular network](https://serverfault.com/questions/478801/ssh-allowusers-from-particular-network)

## Get the Raspberry Pi ready
- Write Image to microSD Card
- Assemble Raspberry Pi
- Connect Ethernet
- Connect Power
- Wait
- Find out what IP Address your RPi got through DHCP
- SSH onto your RPi

## Harden the Raspberry Pi
### Update the System
- First Login will prompt us to change the password. Choose something long and strong.
- sudo apt update
- sudo apt upgrade
### Generate SSH Keys on Windows
- We need to generate an SSH-Key
- We can use Putty Gen to do that
- Click on "Key -> SSH2 RSA key"
- Generate
- Save public key
- Save private key
- Copy the Putty Gen output which starts with "ssh-rsa ..."
- Did apt upgrade finish? Probably not... Wait till it's finished
- apt upgrade finished? Time to continue
### Insert Public SSH Key onto Raspberry Pi
- On the RPi, go to your home folder -> .ssh/
- vi authorized_keys
- add the "ssh-rsa" part which you copied to your clipboard
- save and exit (ESC :wq)
### Configure PuTTY on Windows
- Now you need to tell PuTTY to use your private key to connect
    - Under Connection/SSH/Auth you can Browse for your private key which you saved earlier
    - Go back to Session
    - username@ip-of-raspberry-pi
    - give the session a name and save it
- Login with SSH Key should work
### Update sshd_config
- Next we update sshd_config
- vi /etc/ssh/sshd_config
- PermitRootLogin no
- PasswordAuthentication no
- AllowUsers ubuntu@a.b.c.*
    - update a.b.c to your ip address, i.e. 192.168.1
    - the .* masks it as a /24
- restart ssh -> service ssh restart
### Firewall Rules
- Ubuntu Server comes with ufw
- sudo ufw allow 22
- sudo ufw allow 53
- sudo ufw allow 80
- sudo ufw allow 443
### Additional
- One could automate the upgrade process
- one could install [Logwatch](https://linux.die.net/man/8/logwatch) 
- one could install [Fail2ban](https://www.fail2ban.org/wiki/index.php/Main_Page)