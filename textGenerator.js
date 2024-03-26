const tf = require('@tensorflow/tfjs');
const use = require('@tensorflow-models/universal-sentence-encoder');


async function loadModel() {
    const model = await use.load()
    return model;
}
// Function to generate text given a topic and length
async function generateText(topic) {
    try {
        const model = await loadModel();
        // Generate text based on the topic
        const embeddings = await model.embed(topic);
        return embeddings;
    } catch (error) {
        console.error('Error generating text:', error);
        return null;
    }
}

// Utility function to format the generated text as a tweet
function formatAsTweet(text) {
  const maxLength = 280;
  let tweetText = text.slice(0, maxLength); // Trim text to fit within tweet length
  return tweetText;
}

module.exports = { generateText, formatAsTweet };
