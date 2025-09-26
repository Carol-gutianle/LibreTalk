chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // === 普通生成回复 ===
  if (request.action === "generateReply") {
    chrome.storage.local.get(["apiKey", "model", "baseUrl"], ({ apiKey, model, baseUrl }) => {
      if (!apiKey || !baseUrl) {
        sendResponse({ reply: "Missing API Key or Base URL" });
        return;
      }

      const prompt = `
Style:
${request.style}

Relationship with the other person:
${request.relation}

Chat History:
${request.chatHistory}

The other person said:
"${request.input}"

What I want to say:
"${request.intent}"
`;

      fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey.trim()}`
        },
        body: JSON.stringify({
          model: model || "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are LibreTalk, an expert in emotionally intelligent communication. Always output only the final reply."
            },
            { role: "user", content: prompt }
          ],
          max_tokens: 1024,
          temperature: 0.7
        })
      })
        .then(res => res.json())
        .then(data => {
          const reply = data?.choices?.[0]?.message?.content || "No reply.";
          sendResponse({ reply });
        })
        .catch(err => sendResponse({ reply: "Request failed: " + err.message }));
    });

    return true;
  }

  // === 图片处理 ===
  if (request.action === "processImage") {
    chrome.storage.local.get(["apiKey", "model", "baseUrl"], ({ apiKey, model, baseUrl }) => {
      if (!apiKey || !baseUrl) {
        sendResponse({ error: "Missing API Key or Base URL" });
        return;
      }

      fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey.trim()}`
        },
        body: JSON.stringify({
          model: model || "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are LibreTalk. When the user provides a chat screenshot:
1. First extract structured chat history. Format strictly as alternating lines like:
[Them]: ...
[Me]: ...
2. Then generate a natural reply (based on relationship, style, and intent).
Always output in this format:

[Chat History]
[Them]: ...
[Me]: ...
...

[Reply]
...`
            },
            {
              role: "user",
              content: [
                { type: "text", text: `Relationship: ${request.relation}\nStyle: ${request.style}\nIntent: ${request.intent}\nHere is the chat screenshot:` },
                { type: "image_url", image_url: { url: request.imageData } }
              ]
            }
          ],
          max_tokens: 1024,
          temperature: 0.7
        })
      })
        .then(res => res.json())
        .then(data => {
          const raw = data?.choices?.[0]?.message?.content || "";

          // 根据 [Chat History] 和 [Reply] 分割
          let parsedHistory = "";
          let reply = "";

          const historyMatch = raw.match(/\[Chat History\]([\s\S]*?)\[Reply\]/i);
          const replyMatch = raw.match(/\[Reply\]([\s\S]*)/i);

          if (historyMatch) parsedHistory = historyMatch[1].trim();
          if (replyMatch) reply = replyMatch[1].trim();

          // 如果没匹配成功，就兜底
          if (!parsedHistory && raw.includes("Them:")) {
            parsedHistory = raw.split("Reply:")[0].trim();
          }
          if (!reply && raw.includes("Reply:")) {
            reply = raw.split("Reply:")[1].trim();
          }

          sendResponse({
            parsedHistory,
            reply: reply || raw
          });
        })
        .catch(err => sendResponse({ error: err.message }));
    });

    return true;
  }
});
