// === Data Store ===
const DATA = {
  "who is rishi?": "Rishi Raj Sharma is a passionate full-stack developer and AI enthusiast with expertise in building scalable web applications and intelligent systems. He combines technical excellence with creative problem-solving to deliver innovative solutions.",
  "what are rishi's skills?": "🔧 **Technical Skills:** Python, FastAPI, LangChain, React.js, Node.js, PostgreSQL, MongoDB, AWS, Docker, Kubernetes, Machine Learning, Deep Learning, and DevOps practices.",
  "what are rishi's projects?": "🚀 **Key Projects:** Professional portfolio website, full-stack e-commerce platform, AI-powered resume matcher, interactive data dashboards, and several open-source contributions to the developer community.",
  "what are rishi's achievements?": "🏆 **Notable Achievements:** Finalist at HackTheVerse 2024, Kaggle competition medalist, received Spot Award at Acme Corp for exceptional performance, and recognized as a top contributor in multiple tech communities.",
  "what are rishi's certifications?": "📜 **Certifications:** AWS Solutions Architect Associate, Google Data Analytics Professional Certificate, DeepLearning.AI Specialization, and various other industry-recognized credentials.",
  "how can i contact rishi?": "📧 **Contact Information:** Email: rishi@example.com | LinkedIn: linkedin.com/in/rishi-raj | GitHub: github.com/rishi-raj | Feel free to reach out for collaborations or opportunities!",
  "what are rishi's industry experiences?": "💼 **Industry Experience:** Extensive work in Fin-Tech solutions, retail forecasting systems, Gen-AI HR chatbots, and enterprise-level application development across various domains.",
  "what are rishi's career interests?": "🎯 **Career Focus:** Applied Large Language Models, AI agents development, product strategy, technical mentoring, and building innovative solutions that bridge AI and real-world applications."
};

// === DOM Elements ===
const chipsContainer = document.getElementById("chips-container");
const chatArea = document.getElementById("chat-area");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");

// === Initialize Quick Reply Chips ===
function initializeChips() {
  Object.keys(DATA).forEach(question => {
    const chip = document.createElement("button");
    chip.className = "chip";
    chip.textContent = question;
    chip.onclick = () => handleQuestion(question);
    chipsContainer.appendChild(chip);
  });
}

// === Message Management ===
function addMessage(text, isUser = false) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
  
  const bubble = document.createElement("div");
  bubble.className = "message-bubble";
  bubble.innerHTML = text;
  
  messageDiv.appendChild(bubble);
  chatArea.appendChild(messageDiv);
  chatArea.scrollTop = chatArea.scrollHeight;
  
  return bubble;
}

function showThinking() {
  const thinkingDiv = document.createElement("div");
  thinkingDiv.className = "thinking-bubble";
  thinkingDiv.innerHTML = `
    <span class="thinking-text">Thinking</span>
    <div class="thinking-dots">
      <div class="thinking-dot"></div>
      <div class="thinking-dot"></div>
      <div class="thinking-dot"></div>
    </div>
  `;
  chatArea.appendChild(thinkingDiv);
  chatArea.scrollTop = chatArea.scrollHeight;
  return thinkingDiv;
}

function typeMessage(element, text, speed = 30) {
  return new Promise(resolve => {
    let i = 0;
    element.innerHTML = '';
    const timer = setInterval(() => {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        chatArea.scrollTop = chatArea.scrollHeight;
      } else {
        clearInterval(timer);
        resolve();
      }
    }, speed);
  });
}

// === Question Handling ===
async function handleQuestion(question) {
  addMessage(question, true);
  const thinkingElement = showThinking();
  await new Promise(resolve => setTimeout(resolve, 1500));
  chatArea.removeChild(thinkingElement);
  const response = DATA[question.toLowerCase()] || "🤔 I don't have information about that specific question yet. Please try one of the suggested questions above, or feel free to rephrase your query!";
  const botBubble = addMessage("", false);
  await typeMessage(botBubble, response);
}

// === Action Button Handlers ===
function handleSearchInternet() {
  addMessage("🌐 Search with Internet", true);
  setTimeout(() => {
    addMessage("🚧 **Service Work in Progress**<br><br>Internet search functionality is currently under development. This feature will allow me to search for real-time information beyond my current knowledge base. Stay tuned for updates!", false);
  }, 800);
}

function handleReasoning() {
  addMessage("🧠 Advanced Reasoning", true);
  setTimeout(() => {
    addMessage("🔬 **Advanced Reasoning Mode**<br><br>This feature is currently being developed to provide deep analytical thinking and complex problem-solving capabilities. It will enable me to break down complex queries and provide detailed, step-by-step reasoning. Coming soon!", false);
  }, 800);
}

// === Form Handling ===
messageForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const question = messageInput.value.trim();
  if (question) {
    messageInput.value = "";
    await handleQuestion(question);
  }
});

messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    messageForm.dispatchEvent(new Event("submit"));
  }
});

// === Initialize Application ===
document.addEventListener("DOMContentLoaded", () => {
  initializeChips();
  setTimeout(() => {
    addMessage("🎉 Welcome! I'm ready to answer your questions about Rishi. Click on any quick question above or type your own question below!", false);
  }, 1000);
  messageInput.focus();
});
