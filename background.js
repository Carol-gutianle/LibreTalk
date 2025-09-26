chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // ========= 生成回复 =========
  if (request.action === "generateReply") {
    chrome.storage.local.get(["apiKey", "model", "baseUrl"], ({ apiKey, model, baseUrl }) => {
      if (!apiKey) {
        sendResponse({ reply: "API Key is missing. Please go to the extension popup page and save it first." });
        return;
      }

      if (!baseUrl) {
        sendResponse({ reply: "Base URL is missing. Please set it in the extension popup first." });
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

      fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey.trim()}`
        },
        body: JSON.stringify({
          model: model || "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are LibreTalk, an expert in emotionally intelligent communication. Your task is to help the user craft replies that are natural, sincere, and considerate. The reply should: (1) Express the user's intent clearly. (2) Maintain kindness, empathy, and respect. (3) Adjust tone based on the relationship and style specified. (4) Avoid overly rigid politeness while ensuring the message does not sound harsh. Always output only the final reply text." },
            { role: "user", content: prompt }
          ],
          max_tokens: 1024,
          temperature: 0.7
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data?.choices?.[0]?.message?.content) {
            sendResponse({ reply: data.choices[0].message.content });
          } else {
            sendResponse({ reply: "API returned an abnormal result: " + JSON.stringify(data) });
          }
        })
        .catch(err => {
          sendResponse({ reply: "Wrong request: " + err.message });
        });
    });

    return true;
  }

  // ========= OCR 图片识别 =========
  if (request.action === "ocrImage") {
    chrome.storage.local.get(["apiKey", "model", "baseUrl"], ({ apiKey, model, baseUrl }) => {
      if (!apiKey) {
        sendResponse({ text: "API Key is missing. Please go to the extension popup page and save it first." });
        return;
      }

      if (!baseUrl) {
        sendResponse({ text: "Base URL is missing. Please set it in the extension popup first." });
        return;
      }

      fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey.trim()}`
        },
        body: JSON.stringify({
          model: model || "gpt-4o-mini", // 需要支持 vision 的模型
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: "请识别这张截图中的聊天内容，并尽量保持原有的对话格式：" },
                { type: "image_url", image_url: { url: `data:image/png;base64,${request.imageBase64}` } }
              ]
            }
          ],
          max_tokens: 1024
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data?.choices?.[0]?.message?.content) {
            sendResponse({ text: data.choices[0].message.content });
          } else {
            sendResponse({ text: "API returned an abnormal result: " + JSON.stringify(data) });
          }
        })
        .catch(err => {
          sendResponse({ text: "OCR request failed: " + err.message });
        });
    });

    return true;
  }
});
