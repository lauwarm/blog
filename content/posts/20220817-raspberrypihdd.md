---
title: "Using a Raspberry Pi to format HDDs"
image: ""
date: 2022-08-17T12:38:08+02:00
draft: false
tags: ["raspberry pi", "hdd", "format", "ssh", "s.m.a.r.t", "screen"]
---

## Purpose

Instead of using my Computer I want to utilize a Raspberry Pi 3 to overwrite HDDs with zeros.

## Things needed

We need a Raspberry Pi. Every version should do, I used version 3.
We need a micro SD Card with 8GB or more capacity.

## Downloading stuff

Download [_Raspberry PI Imager_](https://www.raspberrypi.com/software/).
Download [_Raspbian OS Lite_](https://www.raspberrypi.com/software/operating-systems/).

## Prepare SD Card

We use _Raspberry PI Imager_ to write the _Raspbian OS Lite_ to the micro SD Card.
First we select the Image, which we downloaded beforehand. We select the micro SD Card. Make sure its the correct one. The selected Device will be formatted.

Raspberry Pi Imager has an advanced tab. In here we will enable SSH and wireless LAN.
![Raspberry Pi Imager Advanced Settings](/posts/images/posts/20220817-raspberrypihdd/2.webp)
Then we click _SAVE_.

Now we can press _WRITE_. This will take some time.

## Setup the Raspberry Pi

After everything is finished and the micro SD card is unmounted, we insert it into the Raspberry Pi. If you don’t use WiFi, connect a LAN cable, then connect to power. Now we wait again.

Once your Raspberry Pi is up and running and you found your IP we can connect to it over SSH.
Let us do so.

```bash
ssh yourUsername@IP
```

We accept the Fingerprint. We enter the password configured in the _Imager Tool_.

## Update and Upgrade System

We are in. Time to update and upgrade.

```bash
sudo apt-get update
sudo apt-get upgrade
```

Then we install _Smartmontools_ and _Screen_.
The first will let us run S.M.A.R.T. tests. The second lets us create virtual terminals. With this we can detach from a virtual session and close the terminal without the process being killed.

```bash
sudo apt-get install smartmontools
sudo apt-get install screen
```

## Overwrite HDDs

Let us connect the HDDs to the Raspberry Pi.

```bash
lsblk
```

You should see your external HDD as _/dev/sdX_, where _X_ is your specific device letter.

Start a screen session.

```bash
screen -X zero-sdX
```

Start overwrite with zero.

```bash
sudo dd if=/dev/zero of=/dev/sdX status=progress
```

You can now exit the virtual terminal session. Press _ctrl+a_, _ctrl+d_.

To reconnect to a session you write

```bash
session -r zero-sdX
```

Repeat this process for all external HDDs connected to the Raspberry Pi.

## S.M.A.R.T. Test

Once the overwrite finishes, one could use smartmontools to execute a S.M.A.R.T. test.

I personally am doing a _short test_ only.

```bash
sudo smartctl -t short /dev/sdX
```

## Shortfalls

Depending on the type of HDD one tries to fill with zeros, this process takes a lot of time.
WD RED SMR based HDDs are painfully slow. Peaking at 5MBs, one can imagine how long it takes to overwrite a 6TB drive. Yes, 14 (fourteen) Days…

I encountered a problem with multiple HDDs on my Raspberry Pi 3. It seems more than one HDD would end in endless reboot of the external devices, even though they had their own power supply.

## Conclusion

A low power alternative to fill HDDs with zeros. Multiple HDDs don’t seem to work. Depending on the type of HDD technology the process can be really slow.

At Last, a picture of my overwriting setup.
![Raspberry Pi and external HDD](/posts/images/posts/20220817-raspberrypihdd/1.webp)
