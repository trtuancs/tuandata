---
title: Config SSH file
author: Tuan Data
publishDate: 25 Jun 2024
description: Hello everyone, today I would like to share about "How to config SSH file for naming server". I hope my following guide will be helpful to everyone.
tags: [ssh, linux, ssh key]
ogImage: /social-card.png
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
```text title="~/.ssh/config"

```

## Conclusion

