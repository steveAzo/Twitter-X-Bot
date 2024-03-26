const path = require('path');
require("dotenv").config({ path: "./env" })
const CronJob = require("cron").CronJob
const { twitterClient } = require("./twitterClient.js")
const express = require('express')
const { generateText, formatAsTweet } = require('./textGenerator');

const app = express()
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})


const tweet = async () => {
    try {
        const topic = "sotware development"
        const generatedText = await generateText(topic)
        const formattedTweet = formatAsTweet(generatedText.toString())
        const response = await twitterClient.v2.tweet(formattedTweet);
        console.log("Tweet posted successfully:", response.data.text)
    } catch(err) {
        console.log("Error posting tweet:", err)
    }
}



const cronTweet = new CronJob("* * * * *", async () => {
    console.log("Attempting to post tweet...")
    await tweet()
})

cronTweet.start()