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
    const panel = document.getElementById("libretalk-panel");
    if (panel) {
      panel.style.display = panel.style.display === "none" ? "block" : "none";
      return;
    }

    const panelEl = document.createElement("div");
    panelEl.id = "libretalk-panel";
    panelEl.style.cssText = `
      position: fixed;
      bottom: 110px;
      right: 30px;
      width: 400px;
      max-height: 80vh;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
      z-index: 10000;
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
      .modern-input-area {
        width: 100%;
        padding: 12px 16px;
        border: 2px solid #e2e8f0;
        border-radius: 12px;
        font-size: 14px;
        transition: all 0.3s ease;
        background: white;
        box-sizing: border-box;
        font-family: inherit;
        resize: vertical;
        min-height: 45px;
        max-height: 120px;
        overflow-y: auto;
      }
      .modern-input-area:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      }
      .modern-textarea {
        width: 100%;
        padding: 12px 16px;
        border: 2px solid #e2e8f0;
        border-radius: 12px;
        font-size: 14px;
        transition: all 0.3s ease;
        background: white;
        resize: vertical;
        min-height: 80px;
        box-sizing: border-box;
        font-family: inherit;
      }
      .modern-textarea:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      }
      .modern-btn {
        padding: 12px 20px;
        border: none;
        border-radius: 10px;
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s ease;
        font-family: inherit;
      }
      .btn-primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }
      .btn-primary:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
      }
      .btn-secondary {
        background: #f1f5f9;
        color: #64748b;
        border: 1px solid #e2e8f0;
      }
      .btn-secondary:hover {
        background: #e2e8f0;
        transform: translateY(-1px);
      }
      .btn-danger {
        background: #fee2e2;
        color: #dc2626;
        border: 1px solid #fecaca;
      }
      .btn-danger:hover {
        background: #fecaca;
        transform: translateY(-1px);
      }
      #libretalk-panel::-webkit-scrollbar { width: 6px; }
      #libretalk-panel::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 3px; }
      #libretalk-panel::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
      #libretalk-panel::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
    `;
    document.head.appendChild(style);

    panelEl.innerHTML = `
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

        <!-- Form Fields -->
        <div style="display: grid; gap: 16px;">
          <div>
            <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 6px;">👤 Relationship</label>
            <input type="text" id="libretalk-relation" class="modern-input" placeholder="Friend, colleague, family...">
          </div>
          <div>
            <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 6px;">✨ Style</label>
            <input type="text" id="libretalk-style" class="modern-input" placeholder="Casual, formal, friendly...">
          </div>
          <div>
            <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 6px;">🎯 Your Intent</label>
            <textarea id="libretalk-intent" class="modern-input-area" placeholder="What do you want to express?"></textarea>
          </div>
          <div>
            <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 6px;">📜 Chat History (Optional)</label>
            <textarea id="libretalk-history" class="modern-textarea" placeholder="Previous conversation context..."></textarea>
          </div>
          <div>
            <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 6px;">💬 Last Message</label>
            <textarea id="libretalk-input" class="modern-input-area" placeholder="What did they say?"></textarea>
          </div>
        </div>

        <!-- Action Buttons -->
        <div style="display: flex; gap: 12px; margin-top: 20px;">
          <button id="libretalk-submit" class="modern-btn btn-primary" style="flex: 1;">Generate Reply</button>
          <button id="libretalk-clear" class="modern-btn btn-secondary" style="flex: 0 0 auto;">Clear</button>
        </div>

        <div id="libretalk-result-container" style="margin-top:20px; display:none;">
          <p id="libretalk-result" style="white-space:pre-wrap;"></p>
          <button id="libretalk-copy" class="modern-btn btn-secondary">📋 Copy</button>
        </div>
      </div>
    `;

    document.body.appendChild(panelEl);

    (function makeDraggable(el) {
      let isDragging = false;
      let offsetX = 0, offsetY = 0;
      el.addEventListener("mousedown", (e) => {
        if (e.target.closest("textarea") || e.target.closest("input")) return;
        isDragging = true;
        offsetX = e.clientX - el.getBoundingClientRect().left;
        offsetY = e.clientY - el.getBoundingClientRect().top;
        el.style.transition = "none";
      });
      document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        el.style.left = e.clientX - offsetX + "px";
        el.style.top = e.clientY - offsetY + "px";
        el.style.bottom = "auto";
        el.style.right = "auto";
      });
      document.addEventListener("mouseup", () => {
        isDragging = false;
        el.style.transition = "";
      });
    })(panelEl);

    const adjustPanelPosition = () => {
      const panelRect = panelEl.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (panelRect.bottom > viewportHeight) {
        panelEl.style.bottom = "20px";
        panelEl.style.top = "auto";
      }
      if (panelRect.top < 0) {
        panelEl.style.top = "20px";
        panelEl.style.bottom = "auto";
      }
    };
    setTimeout(adjustPanelPosition, 50);

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
          return;
        }
        if (!data.baseUrl) {
          alert("Please set Base URL in extension popup first!");
          submitBtn.innerHTML = originalText;
          submitBtn.style.opacity = "1";
          submitBtn.disabled = false;
          return;
        }
      );
    });

        chrome.runtime.sendMessage(
          { action: "generateReply", relation, style, intent, input, chatHistory: history },
          (response) => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.opacity = "1";
            submitBtn.disabled = false;

            const resultContainer = document.getElementById("libretalk-result-container");
            const result = document.getElementById("libretalk-result");

            if (response && response.reply) {
              result.textContent = response.reply;
              resultContainer.style.display = "block";
              const copyBtn = document.getElementById("libretalk-copy");
              copyBtn.addEventListener("click", () => {
                navigator.clipboard.writeText(response.reply).then(() => {
                  const originalText = copyBtn.innerHTML;
                  copyBtn.innerHTML = "✅ Copied!";
                  setTimeout(() => { copyBtn.innerHTML = originalText; }, 2000);
                }).catch(err => alert("Copy failed: " + err));
              });
              setTimeout(() => { panelEl.scrollTop = panelEl.scrollHeight; adjustPanelPosition(); }, 100);
            } else {
              result.textContent = "No response received. Please check your settings.";
              resultContainer.style.display = "block";
              setTimeout(() => { panelEl.scrollTop = panelEl.scrollHeight; adjustPanelPosition(); }, 100);
            }
          }
        );
      });
      document.getElementById("libretalk-result").textContent = "";
      document.getElementById("libretalk-result-container").style.display = "none";
    });

    document.getElementById("libretalk-close").addEventListener("click", () => {
      panelEl.style.display = "none";
    });

    document.getElementById("libretalk-clear").addEventListener("click", () => {
      document.getElementById("libretalk-relation").value = "";
      document.getElementById("libretalk-style").value = "";
      document.getElementById("libretalk-intent").value = "";
      document.getElementById("libretalk-history").value = "";
      document.getElementById("libretalk-input").value = "";
      document.getElementById("libretalk-result").textContent = "";
      document.getElementById("libretalk-result-container").style.display = "none";
      panelEl.scrollTop = 0;
    });

    const slideDownStyle = document.createElement("style");
    slideDownStyle.textContent = `
      @keyframes slideDown {
        from { opacity: 1; transform: translateY(0) scale(1); }
        to { opacity: 0; transform: translateY(20px) scale(0.95); }
      }
    `;
    document.head.appendChild(slideDownStyle);
  });

  document.body.appendChild(btn);

  (function makeDraggable(el) {
    let isDragging = false;
    let offsetX = 0, offsetY = 0;

    el.addEventListener("mousedown", (e) => {
      isDragging = true;
      offsetX = e.clientX - el.getBoundingClientRect().left;
      offsetY = e.clientY - el.getBoundingClientRect().top;
      el.style.transition = "none";
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      el.style.left = e.clientX - offsetX + "px";
      el.style.top = e.clientY - offsetY + "px";
      el.style.bottom = "auto";
      el.style.right = "auto";
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
      el.style.transition = "";
    });
  })(btn);

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
