require('dotenv').config();
const fetch = require('node-fetch');

const YOUR_API_KEY = process.env.OPENAI_API_KEY;

(async () => {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${YOUR_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: "Bonjour, qui es-tu ?" }
      ]
    })
  });

  const data = await response.json();
  console.log(data.choices[0].message.content);
})();
