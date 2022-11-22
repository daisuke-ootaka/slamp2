"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const { WebClient } = require("@slack/web-api");

/* Oauth Scope
 * - Bot Token Scopes [chat:write, commands, emoji:read]
 */
const botClient = new WebClient(process.env.BOT_USER_OAUTH_TOKEN);

/*
 * Init Express
 */
const app = express();

/*
 * Parse application/x-www-form-urlencoded && application/json
 * Use body-parser's `verify` callback to export a parsed raw body
 * that you need to use to verify the signature
 */
const rawBodyBuffer = (req, res, buf, encoding) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || "utf8");
  }
};
app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }));
app.use(bodyParser.json({ verify: rawBodyBuffer }));

/*
 * Slash Command
 * Endpoint to receive /stamp slash command from Slack.
 */
const getEmoji = async (emoji) => {
  const list = await botClient.emoji.list();
  const emojis = list.emoji || {};

  if (!emojis[emoji]) {
    return null;
  }

  return emojis[emoji];
};
app.post("/command", async (req, res, next) => {
  try {
    // log
    console.log("Request Emoji:", req.body.text);

    let message = {};

    // no args error
    if (!req.body.text) {
      console.log("no args detected.");
      message = {
        response_type: "ephemeral",
        text: "`/stamp :emoji:` みたいに使ってね",
      };
      res.json(message);
      return;
    }

    const text = req.body.text;
    const emoji = text.replace(/:([^:]+):/, "$1");
    const image = await getEmoji(emoji);

    // no custom emoji error
    if (!image) {
      console.log(`custom emoji [${req.body.text}] not found.`);
      message = {
        response_type: "ephemeral",
        text: `カスタム絵文字に ${req.body.text} は見つからなかったよ`,
      };
      res.json(message);
      return;
    }

    // success
    message = {
      response_type: "in_channel", // public to the channel
      attachments: [
        {
          color: "#fff",
          text: "",
          image_url: image,
        },
      ],
    };
    res.json(message);
    return;
  } catch (e) {
    next(e);
  }
});

app.use((err, req, res) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(
    "Express server listening on port %d in %s mode",
    server.address().port,
    app.settings.env
  );
});
