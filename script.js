let chat = document.getElementById("chat");
let memory = [];

async function send() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  addMessage("You", text, "user");
  memory.push({ role: "user", text });

  input.value = "";

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ memory })
  });

  const data = await res.json();
  memory.push({ role: "ai", text: data.text });

  typeMessage("SeekMe", data.text);
}

function addMessage(sender, text, cls) {
  const div = document.createElement("div");
  div.className = `message ${cls}`;
  div.innerHTML = `<span class="${cls}">${sender}:</span> ${text}`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function typeMessage(sender, text) {
  const div = document.createElement("div");
  div.className = "message ai";
  chat.appendChild(div);

  let i = 0;
  const interval = setInterval(() => {
    div.innerHTML = `<span class="ai">${sender}:</span> ${text.slice(0, i++)}`;
    chat.scrollTop = chat.scrollHeight;
    if (i > text.length) clearInterval(interval);
  }, 20);
}
