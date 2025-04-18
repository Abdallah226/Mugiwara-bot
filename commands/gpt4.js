const fetch = require('node-fetch');

const YOUR_API_KEY = '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';

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
