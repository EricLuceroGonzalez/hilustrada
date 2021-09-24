const dotenv = require("dotenv").config();
const config = {
  consumer_key: process.env.apiKey,
  consumer_secret: process.env.apiKeySrct,
  access_token: process.env.accTokn,
  access_token_secret: process.env.accTknScrt,
  dbx_api: process.env.DBX_API_DOMAIN,
  dbx_oauth: process.env.DBX_OAUTH_DOMAIN,
  dbx_oauth_path: process.env.DBX_OAUTH_PATH,
  dbx_token_path: process.env.DBX_TOKEN_PATH,
  dbx_apiKey: process.env.DBX_APP_KEY,
  dbx_apiScrt: process.env.DBX_APP_SECRET,
  dbx_redirect: process.env.OAUTH_REDIRECT_URL,
  BOT_API_KEY: process.env.TWITTER_API_KEY,
  BOT_API_SECRET_KEY: process.env.TWITTER_API_SECRET_KEY,
  BOT_TWITTER_API_BEARER: process.env.TWITTER_API_BEARER,
};

module.exports = config;
