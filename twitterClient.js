const config = require('./config')


const { TwitterApi } = require('twitter-api-v2')

const client = new TwitterApi({
    appKey: config.twitter.consumer_key,
    appSecret: config.twitter.consumer_secret,
    accessToken: config.twitter.access_token,
    accessSecret: config.twitter.access_token_secret
})

const bearer = new TwitterApi(config.twitter.bearer_token);

const twitterClient = client.readWrite
const twitterBearer = bearer.readOnly

module.exports = { twitterClient, twitterBearer }