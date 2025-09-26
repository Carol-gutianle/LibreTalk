function addEQButton() {
  if (document.getElementById("libretalk-btn")) return;

  const btn = document.createElement("button");
  btn.id = "libretalk-btn";
  btn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 
      4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 
      20l1.395-3.72C3.512 15.042 3 13.574 3 
      12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
      stroke="currentColor" stroke-width="2" stroke-linecap="round" 
      stroke-linejoin="round"/>
    </svg>
    <span style="margin-left: 8px;">LibreTalk</span>
  `;

  btn.style.cssText = `
    position: fixed; bottom: 30px; right: 30px; z-index: 2147483647;
    padding: 16px 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-weight: 600; font-size: 15px; border: none; border-radius: 50px;
    cursor: pointer; box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); display: flex; align-items: center;
    backdrop-filter: blur(20px); user-select: none;
  `;

  btn.addEventListener("mouseenter", () => {
    btn.style.transform = "translateY(-2px) scale(1.05)";
    btn.style.boxShadow = "0 12px 40px rgba(102, 126, 234, 0.5)";
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translateY(0) scale(1)";
    btn.style.boxShadow = "0 8px 32px rgba(102, 126, 234, 0.4)";
  });

  btn.addEventListener("click", () => {
    if (document.getElementById("libretalk-panel")) {
      document.getElementById("libretalk-panel").style.display = "block";
      return;
    }

    const panel = document.createElement("div");
    panel.id = "libretalk-panel";
    panel.style.cssText = `
      position: fixed; bottom: 110px; right: 30px; width: 420px; max-height: 80vh;
      background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1); z-index: 10000;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      overflow-y: auto; animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    `;

    const style = document.createElement("style");
    style.textContent = `
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px) scale(0.95); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
      .modern-input, .modern-input-area, .modern-textarea {
        width: 100%; padding: 12px 16px; border: 2px solid #e2e8f0;
        border-radius: 12px; font-size: 14px; background: white;
        transition: all 0.3s ease; box-sizing: border-box;
      }
      .modern-input:focus, .modern-input-area:focus, .modern-textarea:focus {
        outline: none; border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      }
      .modern-btn { padding: 10px 16px; border: none; border-radius: 10px;
        font-weight: 600; font-size: 14px; cursor: pointer; transition: all 0.2s ease;
      }
      .btn-primary { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
      .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3); }
      .btn-secondary { background: #f1f5f9; color: #64748b; border: 1px solid #e2e8f0; }
      .btn-secondary:hover { background: #e2e8f0; transform: translateY(-1px); }
    `;
    document.head.appendChild(style);

    panel.innerHTML = `
      <div style="padding: 24px;">
        <h3 style="margin: 0 0 12px; font-size: 18px;">LibreTalk</h3>

        <label>👤 Relationship</label>
        <input type="text" id="libretalk-relation" class="modern-input" placeholder="Friend, colleague...">

        <label>✨ Style</label>
        <input type="text" id="libretalk-style" class="modern-input" placeholder="Casual, formal...">

        <label>🎯 Your Intent</label>
        <textarea id="libretalk-intent" class="modern-input-area" placeholder="What do you want to express?"></textarea>

        <label>📜 Chat History</label>
        <textarea id="libretalk-history" class="modern-textarea" placeholder="Previous conversation..."></textarea>
        <div style="margin: 8px 0;">
          <input type="file" id="libretalk-ocr" accept="image/*" style="display:none;">
          <label for="libretalk-ocr" class="modern-btn btn-secondary">📂 Select File</label>
        </div>

        <label>✍️ Add to Chat History</label>
        <textarea id="libretalk-message" class="modern-input-area" placeholder="Type or paste a message..."></textarea>
        <div style="margin-top:8px; display:flex; gap:8px;">
          <select id="libretalk-role" class="modern-input" style="flex:1;">
            <option value="their">Their Message</option>
            <option value="me" selected>My Message</option>
          </select>
          <button id="libretalk-add-msg" class="modern-btn btn-primary" style="flex:1;">➕ Add</button>
        </div>

        <label>💬 Last Message</label>
        <textarea id="libretalk-input" class="modern-input-area" placeholder="What did they say?"></textarea>

        <div style="display:flex; gap:12px; margin-top:16px;">
          <button id="libretalk-submit" class="modern-btn btn-primary" style="flex:1;">Generate Reply</button>
          <button id="libretalk-clear" class="modern-btn btn-secondary">Clear</button>
          <button id="libretalk-close" class="modern-btn btn-secondary">Close</button>
        </div>

        <div id="libretalk-result-container" style="margin-top:20px; display:none;">
          <p id="libretalk-result" style="white-space:pre-wrap;"></p>
          <button id="libretalk-copy" class="modern-btn btn-secondary">📋 Copy</button>
        </div>
      </div>
    `;

    document.body.appendChild(panel);

    // === 文件上传处理 ===
    document.getElementById("libretalk-ocr").addEventListener("change", (e) => {
      if (e.target.files[0]) handleImage(e.target.files[0]);
    });

    // === 粘贴图片处理 ===
    document.getElementById("libretalk-message").addEventListener("paste", (e) => {
      const items = e.clipboardData.items;
      for (const item of items) {
        if (item.type.indexOf("image") !== -1) {
          handleImage(item.getAsFile());
        }
      }
    });

    // === 添加消息到 Chat History ===
    document.getElementById("libretalk-add-msg").addEventListener("click", () => {
      const val = document.getElementById("libretalk-message").value.trim();
      const role = document.getElementById("libretalk-role").value;
      if (val) {
        const history = document.getElementById("libretalk-history");
        history.value += `\n${role === "their" ? "[Them]: " : "[Me]: "}${val}`;
        document.getElementById("libretalk-message").value = "";
      }
    });

    // === 生成回复 ===
    document.getElementById("libretalk-submit").addEventListener("click", () => {
      const relation = document.getElementById("libretalk-relation").value;
      const style = document.getElementById("libretalk-style").value;
      const intent = document.getElementById("libretalk-intent").value;
      const input = document.getElementById("libretalk-input").value;
      const history = document.getElementById("libretalk-history").value;

      if (!input.trim()) {
        alert("Please enter their message!");
        return;
      }

      const submitBtn = document.getElementById("libretalk-submit");
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = "⏳ Generating...";
      submitBtn.disabled = true;

      chrome.runtime.sendMessage(
        { action: "generateReply", relation, style, intent, input, chatHistory: history },
        (response) => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          const resultContainer = document.getElementById("libretalk-result-container");
          const result = document.getElementById("libretalk-result");
          if (response && response.reply) {
            result.textContent = response.reply;
          } else {
            result.textContent = "No response.";
          }
          resultContainer.style.display = "block";
        }
      );
    });

    document.getElementById("libretalk-clear").addEventListener("click", () => {
      ["relation","style","intent","history","input","message"].forEach(id=>{
        const el = document.getElementById("libretalk-" + id);
        if (el) el.value = "";
      });
      document.getElementById("libretalk-result").textContent = "";
      document.getElementById("libretalk-result-container").style.display = "none";
    });

    document.getElementById("libretalk-close").addEventListener("click", () => {
      panel.style.display = "none";
    });

    document.getElementById("libretalk-copy").addEventListener("click", () => {
      const text = document.getElementById("libretalk-result").textContent;
      navigator.clipboard.writeText(text).then(() => {
        alert("Copied!");
      });
    });
  });

  document.body.appendChild(btn);
}

// === 图片处理函数 ===
function handleImage(file) {
  const reader = new FileReader();
  reader.onloadend = () => {
    const relation = document.getElementById("libretalk-relation").value;
    const style = document.getElementById("libretalk-style").value;
    const intent = document.getElementById("libretalk-intent").value;

    const submitBtn = document.getElementById("libretalk-submit");
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = "⏳ Processing image...";
    submitBtn.disabled = true;

    chrome.runtime.sendMessage(
      { action: "processImage", imageData: reader.result, relation, style, intent },
      (response) => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        if (response?.error) {
          alert("Image processing failed: " + response.error);
          return;
        }
        if (response.parsedHistory) {
          const historyBox = document.getElementById("libretalk-history");
          historyBox.value += (historyBox.value ? "\n" : "") + response.parsedHistory;
        }
        if (response.reply) {
          const resultContainer = document.getElementById("libretalk-result-container");
          const result = document.getElementById("libretalk-result");
          result.textContent = response.reply;
          resultContainer.style.display = "block";
        }
      }
    );
  };
  reader.readAsDataURL(file);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", addEQButton);
} else {
  addEQButton();
}
