const openRouterUrl = "https://openrouter.ai/api/v1/chat/completions"
const model = "deepseek/deepseek-chat"

const generateResponse = (prompt) => {
    const res = await fetch(openRouterUrl, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY} `,
   
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: model,
    messages: [
        {
            role: 'system',
            content: 'You must return only valid json.'
        },
      {
        role: 'user',
        content: prompt,
      },
    ],
  }),
});
}
