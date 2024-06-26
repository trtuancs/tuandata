---
title: Tmux Guide
author: Tuan Data
publishDate: 26 Jun 2024
updatedDate: 26 Jun 2024
description: Hello everyone, today I would like to share about "Tmux Guide" . I hope my following guide will be helpful to everyone.
tags: [tmux, linux tool]
draft: false
# ogImage: /social-card.png
# coverImage:
#     src: "nodejs.png"
#     alt: "Install Node.js v20.15.0 on Raspberry Pi Cover Image"
#! TODO
---
## Introduction
Hello everyone, today I would like to share about "Tmux Guide" . I hope my following guide will be helpful to everyone.

### Description problem
If you have ever worked on a Linux server, you must have experienced running commands that take a lot of time to complete (e.g., running an SQL query for an ad-hoc report on psql). During this time, you have to wait and maintain the connection from your local machine (SSH into the server) until the process is finished. If the network is unstable and the connection between your local machine and the server gets interrupted, you have to start all over again.

The simplest solution here is that you can run the command in the  background by appending "&" to the end of the command.
However, with this approach, you won't be able to monitor the running process.

Instead, we will use an execellent tool, that is `Tmux`.

## What is Tmux ?
Tmux is a terminal multiplexer, which means it allows you to manage multiple terminal sessions from a single window. This is useful for multitasking and organizing your work in the terminal.

## Installing Tmux
On Ubuntu Linux:
```bash title="tuandata@server"
sudo apt install tmux
```
On CentOS Linux:
```bash title="tuandata@server"
yum install tmux
```
On macOS:
```bash title="tuandata@server"
brew install tmux
```

## Using Tmux
### Create new session
```bash title="tuandata@server"
tmux new -s <session_name>
```
Example: I will run the following command to create a session named `tuandata`
```bash title="tuandata@server"
tmux new -s tuandata
```
### Detach session
To detach session, you press `Ctrl b`, followed by `d`

### Attach session
To attach session, you run the following command
```bash title="tuandata@server"
tmux a -t <session_name>
```
Example: I will run the following command to attach a session named `tuandata`
```bash title="tuandata@server"
tmux a -t tuandata
```

### Show windows list in session
To show all windows in a session, in the session terminal, you press `Ctrl b` then press `w`.

Here, you can move to window you want (by using arrow keys to select the window and then pressing `Enter`)

### Create new window in session
To create new window in session, in the session terminal, you press `Ctrl b` then press `c`

Imediately, a new window is created, and you are at it.

### Rename window
To rename a window, in the terminal session of that window, press `Ctrl b` then `,`.

The window name will appear editable. Remove the old name and type the new name you want.

Finally, press `Enter` to apply the rename.

### Kill window
To kill a window, in the terminal session of that window, press `Ctrl b` then `Shift 7`.

At the bottom terminal session, an alert will apear with the message `kill-window windown_name? (y/n)` to confirm the action of killing the window. 

If you still want to kill the window, press `y`; otherwise, press `n`.

### Show list of sessions
To show the list of sessions, you run the following command
```bash title="tuandata@server"
tmux ls
```

### Kill session
To kill a session, you run the following command
```bash title="tuandata@server"
tmux kill-sess -t <session_name>
```
Example: I will run the following command to kill the session named `tuandata`
```bash title="tuandata@server"
tmux kill-sess -t tuandata
```

## Conclusion
I hope this explanation was clear and easy to understand for you to follow through the process.


