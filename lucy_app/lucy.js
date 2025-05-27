/* ======================================================================
   lucy.js – Deep-Think pipeline
   ====================================================================== */

/* ---------- Static data (Quick-reply) -------------------------------- */
const DATA = {
  "who is rishi?": "Rishi Raj Sharma is a passionate full-stack developer and AI enthusiast.",
  "what are rishi's skills?": "🔧 Skills: Python, FastAPI, LangChain, React, Node, PostgreSQL, MongoDB, AWS, Docker, Kubernetes, ML, DevOps.",
  "what are rishi's projects?": "🚀 Projects: Portfolio, e-commerce, AI resume-matcher, dashboards, OSS libs.",
  "what are rishi's achievements?": "🏆 Achievements: HackTheVerse finalist, Kaggle medalist, Spot Award at Acme Corp.",
  "what are rishi's certifications?": "📜 Certifications: AWS SAA, Google Data Analytics, DeepLearning.AI.",
  "how can i contact rishi?": "📧 Contact: rishi@example.com  |  LinkedIn  |  GitHub.",
  "what are rishi's industry experiences?": "💼 Industry: Fin-Tech, retail forecasting, Gen-AI HR chatbots, enterprise apps.",
  "what are rishi's career interests?": "🎯 Interests: Applied LLMs, autonomous AI agents, product strategy, mentoring."
};

/* ---------- DOM refs -------------------------------------------------- */
const chipsContainer = document.getElementById("chips-container");
const chatArea       = document.getElementById("chat-area");
const messageForm    = document.getElementById("message-form");
const messageInput   = document.getElementById("message-input");
const historyList    = document.getElementById("history-list");

/* ---------- Quick chips ------------------------------------------------ */
function initChips(){
  Object.keys(DATA).forEach(q=>{
    const b=document.createElement("button");
    b.className="chip";
    b.textContent=q;
    b.onclick=()=>handleQuestion(q);
    chipsContainer.appendChild(b);
  });
}

/* ---------- Helper: add plain text line -------------------------------- */
function addMsg(text,isUser=false){
  const wrap=document.createElement("div");
  wrap.className=`message ${isUser?"user-message":"bot-message"}`;
  const bub=document.createElement("div");
  bub.className="message-bubble";
  bub.textContent=text;
  wrap.appendChild(bub);
  chatArea.appendChild(wrap);
  chatArea.scrollTop=chatArea.scrollHeight;
  return wrap;
}

/* ---------- Helper: sidebar history ----------------------------------- */
function pushHistory(text){
  const li=document.createElement("li");
  li.textContent=text;
  li.onclick=()=>handleQuestion(text);
  historyList.appendChild(li);
}

/* ---------- Helper: transient phase line ------------------------------ */
function phaseLine(css,html){
  const div=document.createElement("div");
  div.className=css;
  div.innerHTML=html;
  chatArea.appendChild(div);
  chatArea.scrollTop=chatArea.scrollHeight;
  return div;
}

/* ---------- Deep-Think toggle ----------------------------------------- */
let deepThinkOn=false;
function handleDeepThink(btn){
  deepThinkOn=!deepThinkOn;
  document.querySelectorAll(".tool-btn").forEach(b=>b.classList.remove("active"));
  if(deepThinkOn){
    btn.classList.add("active");
    addMsg("🧠 Deep-Think enabled.",false);
  }else{
    addMsg("🧠 Deep-Think disabled.",false);
  }
}

/* ---------- Toolbar stubs (Search/Reasoning/Upload) ------------------- */
function handleSearchInternet(){addMsg("🌐 Internet search coming soon.",false);}
function handleReasoning(){addMsg("🧠 Advanced reasoning coming soon.",false);}
function handleUploadFile(){
  const fi=document.createElement("input");
  fi.type="file";
  fi.onchange=()=>fi.files.length&&addMsg(`📎 Uploaded: ${fi.files[0].name}`,false);
  fi.click();
}

/* ---------- MAIN Q→A pipeline ---------------------------------------- */
async function handleQuestion(q){
  addMsg(q,true);            /* user (right)                                */
  pushHistory(q);

  /* 1️⃣  Thinking */
  const th=phaseLine("thinking-bubble","Thinking…");
  await new Promise(r=>setTimeout(r,700));
  th.remove();

  /* 2️⃣  Reasoning (only if Deep-Think ON) */
  if(deepThinkOn){
    const rs=phaseLine("reasoning-bubble",
      "🔎 Retrieving embeddings …<br>📚 Vector search …<br>🧠 Synthesizing answer …");
    await new Promise(r=>setTimeout(r,1500));
    rs.remove();
  }

  /* 3️⃣  Answer */
  const ans = DATA[q.toLowerCase()] ||
              "🤔 Sorry, I don’t have that information yet.";
  addMsg(ans,false);         /* bot (left)                                  */
}

/* ---------- Events ---------------------------------------------------- */
messageForm.addEventListener("submit",e=>{
  e.preventDefault();
  const q=messageInput.value.trim();
  if(q){messageInput.value='';handleQuestion(q);}
});
messageInput.addEventListener("keydown",e=>{
  if(e.key==="Enter"&&!e.shiftKey){
    e.preventDefault();
    messageForm.dispatchEvent(new Event("submit"));
  }
});

/* ---------- Boot ------------------------------------------------------ */
window.addEventListener("DOMContentLoaded",()=>{
  initChips();
  addMsg("🎉 Welcome! Ask me anything or pick a quick question!",false);
});


