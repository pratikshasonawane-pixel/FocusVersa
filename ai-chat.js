const chatBox = document.getElementById("chatBox");

let memory = []; // conversation memory

// =========================
// SEND MESSAGE
// =========================

async function sendMsg(){

  const input = document.getElementById("userInput");
  const text = input.value.trim();

  if(!text) return;

  addMessage(text, "user");

  memory.push({ role: "user", content: text });

  input.value = "";

  showTyping();

  try {

    const response = await generateSmartAI(text, memory);

    hideTyping();

    typeMessage(response);

    memory.push({ role: "assistant", content: response });

  } catch (error) {

    hideTyping();

    addMessage("⚠️ AI Error. Check API key or internet.", "ai");

    console.error(error);
  }
}


// =========================
// MESSAGE UI
// =========================

function addMessage(text, type){

  const div = document.createElement("div");

  div.className =
    type === "user" ? "user-msg" : "ai-msg";

  // 🔥 FORCE PROPER FORMAT
  div.innerHTML = text
    .replaceAll("\n", "<br>")
    .replaceAll(".", ". ");

  chatBox.appendChild(div);

  chatBox.scrollTop = chatBox.scrollHeight;
}


// =========================
// TYPING EFFECT (REAL FEEL)
// =========================

function typeMessage(text){

  const div = document.createElement("div");

  div.className = "ai-msg";

  chatBox.appendChild(div);

  let i = 0;

  const interval = setInterval(() => {

    div.innerHTML = text.substring(0, i).replaceAll("\n", "<br>");

    i++;

    chatBox.scrollTop = chatBox.scrollHeight;

    if(i > text.length){
      clearInterval(interval);
    }

  }, 15);
}


// =========================
// TYPING INDICATOR
// =========================

function showTyping(){

  const div = document.createElement("div");

  div.id = "typing";

  div.className = "ai-msg";

  div.innerText = "AI is thinking... 🤖";

  chatBox.appendChild(div);

}

function hideTyping(){

  const t = document.getElementById("typing");

  if(t) t.remove();

}

async function generateSmartAI(userMessage, memory){

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_API_KEY"
    },

    body: JSON.stringify({
      model: "gpt-4o-mini",

      messages: [
        {
          role: "system",
          content: "You are a friendly AI tutor for students (KG to Masters). Always give simple explanations and remember conversation context."
        },

        ...memory,

        {
          role: "user",
          content: userMessage
        }
      ]
    })
  });

  const data = await response.json();

  return data.choices[0].message.content;
}

document.getElementById("userInput")
.addEventListener("keypress", function(e){
  if(e.key === "Enter"){
    sendMsg();
  }
});