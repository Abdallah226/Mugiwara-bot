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

    // Indique que GPT est en train de générer une réponse
    await sendMessage(senderId, { text: 'GPT-4o is thinking...' }, pageAccessToken);

    try {
      const response = await axios.get(
        `https://api.kenliejugarap.com/blackbox-gpt4o/`,
        { params: { text: prompt } }
      );

      const reply = response?.data?.response || "No valid response received from GPT-4o.";
      return sendMessage(senderId, { text: reply }, pageAccessToken);

    } catch (error) {
      console.error('GPT-4o Error:', error.message);
      return sendMessage(senderId, { text: 'There was an error generating the content. Please try again later.' }, pageAccessToken);
    }
  }
};
