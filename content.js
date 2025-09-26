function addEQButton() {
  if (document.getElementById("libretalk-btn")) return;

  const btn = document.createElement("button");
  btn.id = "libretalk-btn";
  btn.innerText = "LibreTalk";

  btn.style.position = "fixed";
  btn.style.bottom = "20px";
  btn.style.right = "20px";
  btn.style.zIndex = "2147483647";
  btn.style.padding = "10px 16px";
  btn.style.background = "#BDE0FE";
  btn.style.color = "white";
  btn.style.fontWeight = "bold";
  btn.style.fontSize = "14px";
  btn.style.border = "none";
  btn.style.borderRadius = "8px";
  btn.style.cursor = "pointer";
  btn.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";

  btn.addEventListener("mouseenter", () => (btn.style.background = "#A2D2FF"));
  btn.addEventListener("mouseleave", () => (btn.style.background = "#BDE0FE"));

  // 点击按钮 → 打开面板
  btn.addEventListener("click", () => {
    if (document.getElementById("libretalk-panel")) {
      document.getElementById("libretalk-panel").style.display = "block";
      return;
    }

    const panel = document.createElement("div");
    panel.id = "libretalk-panel";
    panel.style.position = "fixed";
    panel.style.bottom = "70px";
    panel.style.right = "20px";
    panel.style.width = "320px";
    panel.style.padding = "15px";
    panel.style.background = "#ffffff";
    panel.style.border = "1px solid #ccc";
    panel.style.borderRadius = "10px";
    panel.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
    panel.style.zIndex = "10000";
    panel.style.fontFamily = "Arial, sans-serif";
    panel.style.fontSize = "14px";
    panel.style.lineHeight = "1.5";

    panel.innerHTML = `
      <h3 style="margin-top:0; color:#ff4d6d;">libretalk Reply</h3>
      <label>Relation:</label><br>
      <input type="text" id="libretalk-relation" style="width:100%; margin-bottom:10px;"><br>
      <label>Style:</label><br>
      <input type="text" id="libretalk-style" style="width:100%; margin-bottom:10px;"><br>
      <label>Intent:</label><br>
      <input type="text" id="libretalk-intent" style="width:100%; margin-bottom:10px;"><br>
      <label>Chat History:</label><br>
      <textarea id="libretalk-history" rows="3" style="width:100%; margin-bottom:10px;"></textarea><br>
      <label>Message:</label><br>
      <input type="text" id="libretalk-input" style="width:100%; margin-bottom:10px;"><br>
      <button id="libretalk-submit" style="background:#4CAF50;color:white;padding:6px 12px;border:none;border-radius:6px;cursor:pointer;">Generate Reply</button>
      <button id="libretalk-close" style="margin-left:10px;padding:6px 12px;border:1px solid #ccc;border-radius:6px;background:#FFAFCC;cursor:pointer;">Close</button>
      <button id="libretalk-clear" style="margin-left:10px;padding:6px 12px;border:1px solid #eee;border-radius:6px;background:#A2D2FF;cursor:pointer;">Clear</button>
      <p id="libretalk-result" style="margin-top:10px; white-space:pre-wrap; color:#333;"></p>
    `;

    document.body.appendChild(panel);

    document.getElementById("libretalk-submit").addEventListener("click", () => {
      const relation = document.getElementById("libretalk-relation").value;
      const style = document.getElementById("libretalk-style").value;
      const intent = document.getElementById("libretalk-intent").value;
      const input = document.getElementById("libretalk-input").value;
      const history = document.getElementById("libretalk-history").value;

      if (!input) {
        alert("Please enter the message!");
        return;
      }

      chrome.storage.local.get(["apiKey", "model"], (data) => {
        if (!data.apiKey) {
          alert("Please set API Key in extension popup first!");
          return;
        }

        chrome.runtime.sendMessage(
          {
            action: "generateReply",
            relation,
            style,
            intent,
            input,
            chatHistory: history,
            apiKey: data.apiKey,
            model: data.model || "gpt-4o-mini",
          },
          (response) => {
            document.getElementById("libretalk-result").innerText =
              response && response.reply
                ? "libretalk Suggests:\n\n" + response.reply
                : "No response received. Check background.js logs.";
          }
        );
      });
    });

    document.getElementById("libretalk-close").addEventListener("click", () => {
      panel.style.display = "none";
    });

    document.getElementById("libretalk-clear").addEventListener("click", () => {
    document.getElementById("libretalk-relation").value = "";
    document.getElementById("libretalk-style").value = "";
    document.getElementById("libretalk-intent").value = "";
    document.getElementById("libretalk-history").value = "";
    document.getElementById("libretalk-input").value = "";
    document.getElementById("libretalk-result").innerText = "";
    });
  });

  document.body.appendChild(btn);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", addEQButton);
} else {
  addEQButton();
}
