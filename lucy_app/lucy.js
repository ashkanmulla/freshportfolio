/* ======================================================================
   lucy.js – Deep-Think pipeline
   ====================================================================== */

/* ---------- Static data (Quick-reply) -------------------------------- */
const DATA = {
  "who is askan?": "askan is a distinguished Senior AI Engineer and Lead Data Scientist with over 10 years of comprehensive experience in architecting and deploying enterprise-grade artificial intelligence solutions. He specializes in transforming complex business challenges into scalable AI-driven products that deliver measurable impact across Fortune 500 companies. His expertise spans the entire ML lifecycle from research and experimentation to production deployment and monitoring.",  "what are askan's skills?": "🔧 Technical Skills: Advanced proficiency in Python, R, and Scala for data science workflows. Deep expertise in machine learning frameworks including TensorFlow, PyTorch, Scikit-learn, and XGBoost. Cloud platforms mastery with AWS (SageMaker, EMR, Lambda), Azure ML Studio, and Google Cloud Vertex AI. MLOps excellence using MLflow, Kubeflow, Apache Airflow, and Docker containerization. Big Data technologies including Apache Spark, Hadoop, Kafka, and Elasticsearch. Database proficiency in PostgreSQL, MongoDB, Redis, and Snowflake. Infrastructure automation with Terraform, Kubernetes, and CI/CD pipelines.",
  
  "what are askan's projects?": "🚀 Signature Projects: Architected a real-time recommendation engine serving 50M+ users with 99.9% uptime and 15% conversion lift. Built an end-to-end fraud detection system processing $2B+ daily transactions with 0.02% false positive rate. Developed computer vision models for autonomous quality inspection reducing manufacturing defects by 80%. Created NLP-powered customer service chatbots handling 100K+ daily interactions with 95% satisfaction scores. Designed predictive maintenance systems preventing $20M+ in equipment downtime. Led development of automated feature engineering platform reducing model development time by 70%.",
  
  "what are askan's achievements?": "🏆 Leadership & Impact: Successfully led cross-functional AI teams of 20+ engineers, data scientists, and product managers across multiple continents. Delivered measurable business value exceeding $100M+ through AI implementations. Published 15+ peer-reviewed research papers in top-tier ML conferences (NeurIPS, ICML, ICLR). Holds 8 patents in machine learning optimization and distributed computing. Keynote speaker at major AI conferences including Strata Data, AI Summit, and NeurIPS workshops. Mentored 50+ junior data scientists and engineers, with 90% achieving senior-level promotions. Recognized as 'AI Leader of the Year' by TechCrunch and featured in Forbes '30 Under 30' AI category.",
  
  "what are askan's certifications?": "📜 Professional Certifications: AWS Certified Machine Learning Specialty, Google Professional Machine Learning Engineer, Microsoft Azure AI Engineer Associate, Stanford AI Leadership Certificate, Deep Learning Specialization (Coursera/Andrew Ng), Certified Kubernetes Administrator (CKA), Certified ScrumMaster (CSM), PMI Project Management Professional (PMP), NVIDIA Deep Learning Institute Certified Instructor, Apache Spark Developer Certification.",
  
  "how can i contact Askan?": "📧 Professional Contact: Email: askan.ai@enterprise.com | LinkedIn: linkedin.com/in/askan-ai-leader | GitHub: github.com/askan-ml | Research Publications: scholar.google.com/askan | Technical Blog: medium.com/@askan-ai | Speaking Engagements: speakers@askan-consulting.com",
  
  "what are askan's industry experiences?": "💼 Industry Expertise: FinTech - Led algorithmic trading systems generating $500M+ annual revenue and risk management models for tier-1 investment banks. Healthcare - Developed FDA-approved diagnostic AI models improving patient outcomes by 40% and drug discovery pipelines reducing R&D timelines by 2 years. Automotive - Architected perception systems for Level 4 autonomous vehicles with 99.99% safety reliability. E-commerce - Built personalization engines increasing customer lifetime value by 35% for major retail platforms. Manufacturing - Implemented Industry 4.0 AI solutions optimizing supply chains and reducing operational costs by 25%. Telecommunications - Designed network optimization algorithms improving service quality for 10M+ subscribers.",
  
  "what are Askan's career interests?": "🎯 Strategic Focus Areas: Pioneering Generative AI applications for enterprise transformation and developing next-generation LLM architectures. Advancing MLOps practices for petabyte-scale data processing and real-time inference systems. Leading AI ethics initiatives and responsible AI governance frameworks for Fortune 500 deployments. Building high-performing, diverse AI teams and establishing centers of excellence. Driving AI product strategy from conception to market launch with P&L responsibility. Bridging research-to-production gaps through innovative engineering practices. Executive advisory for AI transformation roadmaps and digital innovation strategies."
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


