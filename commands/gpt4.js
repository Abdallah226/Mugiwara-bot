const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'gpt4',
  description: 'Interact with GPT-4o',
  usage: 'gpt4 [your message]',
  author: 'coffee',

  async execute(senderId, args, pageAccessToken) {
    const prompt = args.join(' ').trim();
    if (!prompt) {
      return sendMessage(senderId, { text: "Usage: gpt4 <question>" }, pageAccessToken);
    }

    // Indiquer à l'utilisateur que le bot traite la demande
    await sendMessage(senderId, { text: 'GPT-4o is thinking...' }, pageAccessToken);

    try {
      const { data } = await axios.post(
        'https://api.kenliejugarap.com/blackbox-gpt4o/',
        { text: prompt },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (data?.response) {
        return sendMessage(senderId, { text: data.response }, pageAccessToken);
      } else {
        return sendMessage(senderId, { text: "No valid response received from GPT-4o." }, pageAccessToken);
      }
    } catch (error) {
      console.error("GPT-4o Error:", error.message);
      return sendMessage(senderId, { text: 'There was an error generating the content. Please try again later.' }, pageAccessToken);
    }
  }
};
