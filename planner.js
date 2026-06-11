// =========================
// AI STUDY PLANNER (FRONTEND LOGIC)
// =========================

function generatePlan(){

  const subjects =
  document.getElementById("subjectInput").value;

  const hours =
  document.getElementById("hoursInput").value;

  const examDate =
  new Date(document.getElementById("examDate").value);

  const output =
  document.getElementById("planOutput");

  const thinking =
  document.getElementById("aiThinking");

  if(!subjects || !hours || !examDate){

    alert("Please fill all fields ⚠️");

    return;

  }

  // SHOW AI LOADING
  thinking.style.display = "block";
  output.innerHTML = "";

  setTimeout(() => {

    thinking.style.display = "none";

    const today = new Date();

    const diffDays =
    Math.ceil((examDate - today) / (1000*60*60*24));

    const subjectList =
    subjects.split(",");

    let html = "";

    subjectList.forEach((sub, i) => {

      let dailySplit =
      Math.floor(hours / subjectList.length);

      html += `
        <div class="glass-card">

          📘 ${sub.trim()}<br><br>

          📅 Days Left: ${diffDays}<br>
          ⏳ Daily Study: ${dailySplit} hrs<br>

          <!-- PROGRESS BAR -->
          <div class="progress">
            <div class="progress-bar" style="width:${Math.random()*80 + 20}%"></div>
          </div>

          <p>🧠 AI Suggestion: Revise + Practice MCQs</p>

          <small>🔔 Reminder: Revise ${sub.trim()} every 2 days</small>

        </div>
      `;

    });

    output.innerHTML = html;

  }, 2000);

}