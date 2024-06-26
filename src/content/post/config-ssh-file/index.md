---
title: Config SSH file
author: Tuan Data
publishDate: 25 Jun 2024
updatedDate: 25 Jun 2024
description: Hello everyone, today I would like to share about "How to config SSH file for naming server". I hope my following guide will be helpful to everyone.
tags: [ssh, linux, ssh key]
# ogImage: /social-card.png
# coverImage:
#     src: "nodejs.png"
#     alt: "Install Node.js v20.15.0 on Raspberry Pi Cover Image"
#! TODO
---
## Introduction
Hello everyone, today I would like to share about "How to config SSH file for naming server". I hope my following guide will be helpful to everyone.

### Problem
If you frequently work on Linux servers through SSH connections, you will find that remembering all the server IP addresses, different usernames, ports and various command line options is difficult, if not impossible.

### Solution
Maybe, you'll save these SSH commands in a file. When you need to use them, you can just copy and paste them to ssh into the server.

But today, I will share with you a much simpler and better way, which is to use `ssh-config` file.

## Step by step

### Step 1: Create `config` file
First of all, you copy and run the following command to create `config` file.
```bash title="admin@macmini"
touch ~/.ssh/config
```

After creating the config file, you copy and run the following command to set the file permissions.
```bash title="admin@macmini"
chmod 600 ~/.ssh/config
```

### Step 2: Edit `config` file
The structure of the config file is as follows
```text title="~/.ssh/config"
Host    <host name alias>
        HostName    <ip/url host>
        User        <username>
```
Here's an example
```text title="~/.ssh/config"
Host    server1
        HostName    10.0.0.1
        User        tuandata
```
Declare the information for each server one by one according to the template above, then save the file and run the following command to change the permissions of the `config` file
```bash title="admin@macmini"
chmod 600 ~/.ssh/config
```

### Step 3: Using `config` file
If you haven't set up the SSH config file yet, you would run the following command to SSH into a server, right?
```bash title="admin@macmini"
ssh username@hostname
```
Example
```bash title="admin@macmini"
ssh tuandata@10.0.0.1
```
But after you have configured the SSH file, you only need to run the following command
```bash title="admin@macmini"
ssh host_name_alias
```
Example
```bash title="admin@macmini"
ssh server1
```
Very simple but very effective, right everyone?

## Conclusion
I hope this explanation was clear and easy to understand for you to follow through the process.