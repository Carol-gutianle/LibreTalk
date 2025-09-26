document.getElementById("saveConfig").addEventListener("click", () => {
  const apiKey = document.getElementById("apiKey").value;
  const model = document.getElementById("model").value;

  chrome.storage.local.set({ apiKey, model }, () => {
    document.getElementById("status").innerText = "Config saved!";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["apiKey", "model"], (data) => {
    if (data.apiKey) document.getElementById("apiKey").value = data.apiKey;
    if (data.model) document.getElementById("model").value = data.model;
  });
});


document.getElementById("generateReply").addEventListener("click", () => {
  const chatHistory = document.getElementById("chatHistory").value;
  const input = document.getElementById("inputMessage").value;
  const relation = document.getElementById("relation").value;
  const style = document.getElementById("style").value;
  const intent = document.getElementById("intent").value;

  chrome.runtime.sendMessage(
    {
      action: "generateReply",
      chatHistory,
      input,
      relation,
      style,
      intent
    },
    (response) => {
      document.getElementById("replyResult").innerText =
        "EQWoman suggests: " + response.reply;
    }
  );
});

document.getElementById("copyReply").addEventListener("click", () => {
  const replyText = document.getElementById("replyResult").value;
  navigator.clipboard.writeText(replyText).then(() => {
    alert("Copied to clipboard!");
  }).catch(err => {
    alert("Copy failed: " + err);
  });
});