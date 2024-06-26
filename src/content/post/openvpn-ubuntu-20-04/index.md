---
title: Working with OpenVPN Server on Ubuntu Server 20.04
author: Tuan Data
publishDate: 26 Jun 2024
updatedDate: 26 Jun 2024
description: Hello everyone, today I would like to share about "Working with OpenVPN Server on Ubuntu Server 20.04" . I hope my following guide will be helpful to everyone.
tags: [openvpn, vpn]
draft: false
# ogImage: /social-card.png
coverImage:
    src: "vpn.png"
    alt: "Working with OpenVPN Server on Ubuntu Server 20.04"
#! TODO
---
## Introduction
Hello everyone, today I would like to share about "Working with OpenVPN Server on Ubuntu Server 20.04" . I hope my following guide will be helpful to everyone.

## What is OpenVPN?
OpenVPN is a tool that helps you create a Virtual Private Network (VPN). 

This virtual network has similar properties to a LAN (Local Area Network), where machines within the same network can communicate with each other using IP addresses, thereby creating a private local network for an organization.

For more details, you can search on Google to find additional information.

## Setup OpenVPN Server
First of all, you run the following command to download the setup file
```bash title="tuandata@server"
wget https://git.io/vpn -O openvpn-install.sh
```
After finishing the download, you run the following command to change the file permissions
```bash title="tuandata@server"
sudo chmod +x openvpn-install.sh
```
And then, you run the file using the following command
```bash title="tuandata@server"
sudo bash openvpn-install.sh
```
After that, you set it up as follows
```bash {6} {9} {18} {21} {}
Welcome to this OpenVPN road warrior installer!

Which protocol should OpenVPN use?
   1) UDP (recommended)
   2) TCP
Protocol [1]: 1

What port should OpenVPN listen to?
Port [1194]: 

Select a DNS server for the clients:
   1) Current system resolvers
   2) Google
   3) 1.1.1.1
   4) OpenDNS
   5) Quad9
   6) AdGuard
DNS server [1]: 2

Enter a name for the first client:
Name [client]: name_vpn
OpenVPN installation is ready to begin.
Press any key to continue...
```
After completing the installation, the final nine will show the path to your VPN file, what is usually something like `/root/name_vpn.ovpn`

Copy this file then run it on other machines to connect to this VPN Network.

Additional, you can run the following command to find the path where the VNP file is saved
```bash title="tuandata@server"
sudo find / -type f -name "*.ovpn" -ls
```

Next, you open the VPN configuration file to configure it by using the following command
```bash title="tuandata@server"
vi /etc/openvpn/server/server.conf
```
You comment out the following line by adding a `#` at the begining, then save the file

```conf title="/etc/openvpn/server/server.conf"
# push "redirect-gateway def1 ipv6 bypass-dhcp"
```

## Start OpenVPN Server
You run the following command to start OpenVPN Server
```bash title="tuandata@server"
sudo systemctl start openvpn-server@server.service
```

## Get status OpenVPN Server
You run the following command to get status of OpenVPN Server
```bash title="tuandata@server"
sudo systemctl status openvpn-server@server.service
```

## Stop OpenVPN Server
You run the following command to stop OpenVPN Server
```bash title="tuandata@server"
sudo systemctl stop openvpn-server@server.service
```

## Restart OpenVPN Server
You run the following command to restart OpenVPN Server
```bash title="tuandata@server"
sudo systemctl restart openvpn-server@server.service
```

## Addition client to VPN
To adding client to VPN, you run the following command
```bash title="tuandata@server"
sudo bash openvpn-install.sh
```
After that, the terminal will show the following prompt. You enter `1` as shown
```bash {8}
Looks like OpenVPN is already installed

What do you want to do?
   1) Add a cert for a new user
   2) Revoke existing user cert
   3) Remove OpenVPN
   4) Exit
Select an option [1-4]: 1
```
Then you set it up as mentioned above ([in the setup part](#setup-openvpn-server) ). Follow the steps provided during the setup process to complete the configuration.

## Deleting client
To deleting client, you run the following command
```bash title="tuandata@server"
sudo bash openvpn-install.sh
```
After that, the terminal will show the following prompt. You enter `2` as shown
```bash {6}
What do you want to do?
   1) Add a cert for a new user
   2) Revoke existing user cert
   3) Remove OpenVPN
   4) Exit
Select an option [1-4]: 2
```
Then you select client to delete and confirm the deletion. This typically involves choosing the client number or name from a list and then confirming the action.

## Conclusion
I hope this explanation was clear and easy to understand for you to follow through the process.