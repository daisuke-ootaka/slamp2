# Slamp2
Chat with big :emoji: in slack.

This project is based on `ringogirl`'s slamp project.
- https://github.com/ringogirl/slamp (404 Not Found)
- [Slackのemojiをデカくする \- Grooves開発ブログ](https://tech.grooves.com/entry/2017/04/04/122107)

## What is it? What is it?

Chat with big :emoji: in slack.

![image](https://github.com/daisuke-ootaka/slamp2/blob/main/images/serval_chan.jpg)

## Install Yourself

### Create Glitch Application

Deploy app to [Glitch](https://glitch.com/)

Now, environment variables is temporary.

### Create Slack Application

Go to [Slack API: Applications](https://api.slack.com/apps).

1. `Create New app`. (From scratch)
2. Setup application.
  - `App Name`: Slamp2
  - `Workspace`: Pick a workspace to develop your app in.
3. `Create App`.

### Create Slash Commands

In the slack application.

1. Select `Slash Commands` from Features menu.
2. `Create New Command`.
3. Setup Slack commands.
  - `Command`: /stamp
  - `Request URL`: Your application URL.
      - e.g.) https://foobar.com/command
  - `Short Description`: Stamp emoji
  - `Usage Hint`: :emoji:
4. `Save`.

### Setup OAuth

Select `OAuth & Permissions` from Features menu.

#### Select Permission Scopes

Select Permission scopes below for Bot Token Scopes.

- `commands` (default)
- `emoji:read`
- `chat:write`

### Install app

Select `OAuth & Permissions` from Features menu.

1. `Install to Workspace`
2. `Authorize`

### Setup environment variables

In the Glitch application, input variables from slack application.

- BOT_USER_OAUTH_TOKEN
    - `Bot User OAuth Token` value in Slack App

## Usage

type below in slack.

`/stamp :custom_emoji:`

![image](https://github.com/daisuke-ootaka/slamp2/blob/main/images/stamp.gif)


## So fun!

![image](https://github.com/daisuke-ootaka/slamp2/blob/main/images/kotsume_kawauso.jpg)

## About Icons
- All Kemono-Frends icon from <a href="https://twitter.com/Kiguchi1902">@Kiguchi1902</a>
    - <a href="https://togetter.com/li/1088229">けものフレンズアイコンまとめ【フリーアイコン】 - Togetter</a>
