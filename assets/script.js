/* Full JS logic: theme, tabs, data, import/export, timeline, detail, progress */

/* ======= Roadmap DATA ======= */
const TOPICS = [
  { id:'phase1_linux', title:'Linux Fundamentals', phase:1, week:1, deadlineDays:7,
    sub:["Systemd & services","Users & Permissions","Filesystem & Mounts","Monitoring & Health","Kernel tuning","Security hardening"],
    concepts:["systemd","journald","crontab","SELinux","LVM","iostat"], skills:["Service management","Troubleshooting"], resources:["The Linux Programming Interface","Linux Foundation"], poc:"Self-healing Linux service + health dashboard" },

  { id:'phase1_git', title:'Git & Source Control', phase:1, week:1, deadlineDays:14,
    sub:["Git basics","Branching strategies","Merge/rebase","Hooks & CI integration","Authentication & signing","Repo governance"],
    concepts:["GitFlow","trunk-based","pre-commit","GPG signing","merge strategy"], skills:["Conflict resolution","Release tagging"], resources:["Pro Git","Atlassian Git tutorials"], poc:"GitFlow + pre-commit enforcement" },

  { id:'phase1_python', title:'Python for Automation', phase:1, week:2, deadlineDays:21,
    sub:["Syntax & idioms","Data structures","Async & subprocess","Packaging & testing","Boto3 & AWS SDK","API automation"],
    concepts:["asyncio","boto3","pytest","virtualenv","poetry"], skills:["Automation scripts","CLI tools"], resources:["Real Python","AWS SDK docs"], poc:"Python CLI for infra automation" },

  { id:'phase2_network', title:'Networking', phase:2, week:3, deadlineDays:28,
    sub:["TCP/IP","DNS","Routing & NAT","Load balancing","Firewalls & VPN","Cloud networking"],
    concepts:["tcpdump","iptables","NGINX","VPC peering","BGP basics"], skills:["Network troubleshooting"], resources:["Networking for DevOps"], poc:"Network latency & outage monitor" },

  { id:'phase2_bash', title:'Bash Scripting', phase:2, week:3, deadlineDays:28,
    sub:["Shell basics","awk/sed/xargs","Traps & signals","Idempotent scripts","CI integration","Testing scripts"],
    concepts:["bash best practices","strict mode","shellcheck"], skills:["System automation"], resources:["Bash Guide","ShellCheck"], poc:"Backup & auto-recovery script" },

  { id:'phase3_cloud', title:'Cloud Infrastructure', phase:3, week:4, deadlineDays:35,
    sub:["VPC/VNet","IAM & Roles","Compute & ASG","Serverless","Storage & Lifecycle","Monitoring"],
    concepts:["CloudWatch","ASG","S3 lifecycle","Lambda","VPC"], skills:["Cloud infra design"], resources:["AWS Docs","Azure Docs"], poc:"End-to-end VPC + monitoring" },

  { id:'phase4_iac', title:'Infrastructure as Code', phase:4, week:5, deadlineDays:42,
    sub:["Terraform modules","State management","Drift detection","Ansible playbooks","CloudFormation/ARM","IaC testing"],
    concepts:["terraform state","tflint","ansible vault","checkov","drift detection"], skills:["Idempotent infra","drift remediation"], resources:["Terraform docs","Ansible docs"], poc:"3-tier infra + drift detection" },

  { id:'phase5_docker', title:'Docker & Containerization', phase:5, week:6, deadlineDays:49,
    sub:["Images & layers","Multi-stage builds","Registry management","Image scanning","Networking & volumes","Optimizations"],
    concepts:["Dockerfile best practices","Trivy","Harbor","ECR"], skills:["Containerize apps"], resources:["Docker docs"], poc:"Containerize 3 apps + registry" },

  { id:'phase5_k8s', title:'Kubernetes Core', phase:5, week:7, deadlineDays:56,
    sub:["Pods & controllers","Services & networking","Config maps & secrets","Ingress & LB","Storage classes","Helm basics"],
    concepts:["kube-apiserver","etcd","coredns","kubectl","deployments"], skills:["Cluster ops"], resources:["Kubernetes docs"], poc:"Deploy microservices on k8s" },

  { id:'phase6_advanced_k8s', title:'K8s Advanced & Mesh', phase:6, week:8, deadlineDays:63,
    sub:["Helm charts","RBAC & NetworkPolicy","Cluster autoscaler","Istio service mesh","Operator patterns","K8s security"],
    concepts:["CustomResource","istio mTLS","OPA/Gatekeeper","Cluster Autoscaler"], skills:["Service mesh routing"], resources:["Istio docs"], poc:"Helm + Istio + secure cluster" },

  { id:'phase7_cicd', title:'CI/CD & GitOps', phase:7, week:9, deadlineDays:70,
    sub:["Jenkins pipelines","GitHub Actions","ArgoCD/Flux","Artifact management","Shared libs","Secrets in CI"],
    concepts:["pipeline as code","blue/green","canary","artifact repo"], skills:["Release automation"], resources:["Jenkins docs"], poc:"Jenkins multi-stage + ArgoCD" },

  { id:'phase8_obs', title:'Observability & AIOps', phase:8, week:10, deadlineDays:77,
    sub:["Prometheus","Grafana","ELK/Loki","Tracing Jaeger","Alerting & Oncall","AIOps toolchains"],
    concepts:["OpenTelemetry","Alertmanager","Dynatrace"], skills:["SLO/SLA design"], resources:["Observability docs"], poc:"Custom exporter + Grafana" },

  { id:'phase9_sec', title:'Security & DevSecOps', phase:9, week:11, deadlineDays:84,
    sub:["Secrets mgmt","Image scanning","IAM best practices","CIS hardening","SAST/DAST","Runtime security"],
    concepts:["Vault","Trivy","Lynis","Snyk","SBOM"], skills:["Secure pipelines"], resources:["OWASP"], poc:"Vault + security pipeline" },

  { id:'phase10_sre', title:'SRE & Reliability', phase:10, week:12, deadlineDays:90,
    sub:["SLO/SLA","Error budgets","Chaos engineering","Load testing","HA design","DR planning"],
    concepts:["k6","gremlin","autoscaling","RTO/RPO"], skills:["Reliability engineering"], resources:["SRE book"], poc:"Chaos + DR simulation" },

  { id:'phase11_mlop', title:'MLOps', phase:11, week:13, deadlineDays:98,
    sub:["Model tracking","Feature stores","CI for ML","Serving & inference","Model monitoring","Data pipelines"],
    concepts:["mlflow","kubeflow","airflow","seldon"], skills:["Production ML ops"], resources:["MLOps docs"], poc:"MLflow pipeline" },

  { id:'phase12_llm', title:'LLM & GenAI', phase:12, week:14, deadlineDays:105,
    sub:["RAG","LangChain","Vector DBs","Prompt engineering","Model hosting","Ethics & monitoring"],
    concepts:["Pinecone","Chroma","LlamaIndex","RAG patterns"], skills:["LLM ops"], resources:["HuggingFace"], poc:"RAG chatbot" },

  { id:'phase13_lead', title:'Leadership & Architecture', phase:13, week:15, deadlineDays:112,
    sub:["HLD/LLD","Cost modelling","Runbooks","RACI/CAB","Tech strategy","Mentoring"],
    concepts:["arch reviews","capacity planning"], skills:["Architecture leadership"], resources:["Team docs"], poc:"Migration strategy doc" },

  { id:'phase14_finops', title:'Stakeholder & FinOps', phase:14, week:16, deadlineDays:119,
    sub:["Cost optimization","Reporting KPIs","Vendor mgmt","SLA/OLA","Forecasting","OKRs"],
    concepts:["RI savings","cost allocation"], skills:["FinOps"], resources:["FinOps foundation"], poc:"FinOps audit" }
];

/* ======= State & Persistence ======= */
let state = { done: JSON.parse(localStorage.getItem('roadmap_done')||'{}'), theme: localStorage.getItem('roadmap_theme') || 'dark' };

/* ======= DOM refs ======= */
const sidebar = document.getElementById('sidebar');
const homeView = document.getElementById('homeView');
const detailView = document.getElementById('detailView');
const progressView = document.getElementById('progressView');

/* ======= Theme handling ======= */
function applyTheme(t){ document.body.setAttribute('data-theme', t); localStorage.setItem('roadmap_theme', t); state.theme=t; document.getElementById('themeToggle').checked = (t==='light'); }
applyTheme(state.theme);
document.getElementById('themeToggle').addEventListener('change', (e)=> applyTheme(e.target.checked ? 'light':'dark'));

/* ======= Tabs ======= */
document.getElementById('tabHome').addEventListener('click', ()=> showTab('home'));
document.getElementById('tabDetail').addEventListener('click', ()=> showTab('detail'));
document.getElementById('tabProgress').addEventListener('click', ()=> showTab('progress'));
function showTab(tab){ homeView.style.display = tab==='home' ? 'block':'none'; detailView.style.display = tab==='detail' ? 'block':'none'; progressView.style.display = tab==='progress' ? 'block':'none'; }

/* ======= Render functions ======= */
function humanDeadline(days){ const d=new Date(); d.setDate(d.getDate()+Number(days)); return d.toISOString().slice(0,10); }

function renderSidebar(){
  sidebar.innerHTML = '';
  const html = `
    <div class="profile"><div style="width:48px;height:48px;border-radius:8px;background:linear-gradient(135deg,#06b6d4,#7c3aed)"></div>
    <div style="margin-left:10px"><div style="font-weight:700">Mayank — Roadmap</div><div class="small">Senior DevOps → Platform + AI</div></div></div>
    <div style="margin-top:12px"><div class="progress-pill"><strong id='completed-count'>0</strong> / <span id='total-count'>0</span> topics completed</div></div>
    <div style="margin-top:12px"><button id='markAll' class='btn'>Mark all done</button><button id='resetAll' class='btn ghost' style='margin-left:8px'>Reset</button></div>
    <div style='margin-top:12px'><div class='small muted'>Export / Import</div><div style='margin-top:6px'><button id='exportJson' class='btn ghost'>Export JSON</button> <button id='exportCsv' class='btn ghost'>Export CSV</button></div>
    <div style='margin-top:8px'><input type='file' id='importFile' accept='.json,.csv' /></div></div>
  `;
  sidebar.innerHTML = html;
  document.getElementById('markAll').addEventListener('click', ()=>{ TOPICS.forEach(t=> state.done[t.id]=true); persist(); renderTimeline(); renderProgress(); });
  document.getElementById('resetAll').addEventListener('click', ()=>{ state.done={}; persist(); renderTimeline(); renderProgress(); });
  document.getElementById('exportJson').addEventListener('click', exportJson);
  document.getElementById('exportCsv').addEventListener('click', exportCsv);
  document.getElementById('importFile').addEventListener('change', importFile);
}

function persist(){ localStorage.setItem('roadmap_done', JSON.stringify(state.done)); }

function renderTimeline(){
  homeView.innerHTML = '<h3>Roadmap Journey</h3><div class="timeline-grid" id="timelineGrid"></div>';
  const grid = document.getElementById('timelineGrid');
  const grouped = {};
  TOPICS.forEach(t=>{ grouped[t.phase]=grouped[t.phase]||[]; grouped[t.phase].push(t); });
  Object.keys(grouped).sort((a,b)=>a-b).forEach(ph => {
    const items = grouped[ph];
    // phase header full width
    const hdr = document.createElement('div'); hdr.className='topic-node'; hdr.style.gridColumn='1 / -1'; hdr.style.background='linear-gradient(90deg, rgba(124,58,237,0.12), rgba(6,182,212,0.04))'; hdr.innerHTML = `<div style='font-weight:800'>Phase ${ph} — ${items.length} topics</div><div class='small muted'>Weeks ${items[0].week} → ${items[items.length-1].week}</div>`;
    grid.appendChild(hdr);
    items.forEach(t=>{
      const node = document.createElement('div'); node.className='topic-node'; node.dataset.id=t.id;
      node.innerHTML = `<div style='display:flex;justify-content:space-between'><div><div class='topic-title'>${t.title}</div><div class='topic-meta'>${t.sub.slice(0,3).join(', ')}${t.sub.length>3?'...':''}</div><div class='week-label'>Week ${t.week} • <span class='deadline'>${humanDeadline(t.deadlineDays)}</span></div></div><div style='display:flex;flex-direction:column;align-items:flex-end'><div class='topic-badge'>${t.sub.length} sub</div><div style='width:12px;height:12px;border-radius:50%;margin-top:8px' data-dot></div></div></div><div class='tooltip'><strong>Subtopics</strong><ul>${t.sub.map(s=>`<li>${s}</li>`).join('')}</ul></div>`;
      node.addEventListener('click', ()=> openDetail(t.id));
      grid.appendChild(node);
    });
  });
  // update counts and dot statuses
  document.getElementById('total-count').textContent = TOPICS.length;
  renderProgress();
}

let currentTopic = null;
function openDetail(id){
  const t = TOPICS.find(x=>x.id===id); if(!t) return;
  currentTopic = t;
  detailView.innerHTML = `
    <div style='display:flex;justify-content:space-between;align-items:center'><div><h2>${t.title}</h2><div class='small muted'>Phase ${t.phase} • Week ${t.week}</div></div><div><button id='toggleComplete' class='btn'>${state.done[t.id]?'Mark Incomplete':'Mark Complete'}</button><button id='backHome' class='btn ghost' style='margin-left:8px'>Back</button></div></div>
    <div style='margin-top:12px' class='chips'>${t.concepts.map(c=>`<div class='chip'>${c}</div>`).join('')}</div>
    <div style='margin-top:12px'><h4>Skills</h4><div class='chips'>${t.skills.map(s=>`<div class='chip'>${s}</div>`).join('')}</div></div>
    <div style='margin-top:12px'><h4>Resources</h4><div class='chips'>${t.resources.map(r=>`<div class='chip'>${r}</div>`).join('')}</div></div>
    <div style='margin-top:12px'><h4>POC / Mini Project</h4><div class='small muted'>${t.poc}</div></div>
    <div style='margin-top:12px' class='card'><div class='small muted'>Deadline: <strong>${humanDeadline(t.deadlineDays)}</strong></div><div class='small muted'>Phase: ${t.phase}</div><div class='small muted'>Week: ${t.week}</div></div>
  `;
  document.getElementById('toggleComplete').addEventListener('click', ()=>{ state.done[t.id]=!state.done[t.id]; persist(); renderTimeline(); openDetail(t.id); });
  document.getElementById('backHome').addEventListener('click', ()=> showTab('home'));
  showTab('detail');
}

function renderProgress(){
  // update dots
  document.querySelectorAll('[data-dot]').forEach(el=>{ const node = el.closest('.topic-node'); if(!node) return; const id=node.dataset.id; el.style.background = state.done[id]? 'var(--good)':'rgba(255,255,255,0.08)'; });
  // completed count
  const doneCount = Object.values(state.done).filter(Boolean).length; const cntEl = document.getElementById('completed-count'); if(cntEl) cntEl.textContent = doneCount;
  // progress view
  progressView.innerHTML = '<h3>Progress Overview</h3><div class="progress-grid" id="progressGrid"></div>';
  const pg = document.getElementById('progressGrid'); TOPICS.forEach((t,i)=>{ const item=document.createElement('div'); item.className='progress-item'; item.innerHTML = `<div><div style='font-weight:700'>${i+1}. ${t.title}</div><div class='small muted'>${t.sub[0]}${t.sub.length>1?' • ...':''}</div></div><div><div class='dot ${state.done[t.id]?'done':'todo'}'></div></div>`; item.addEventListener('click', ()=> openDetail(t.id)); pg.appendChild(item); });
}

/* ===== Import/Export ===== */
function exportJson(){ const payload={savedAt:new Date().toISOString(), done: state.done}; const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='devops_roadmap_progress.json'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url); }
function exportCsv(){ const rows=[['id','title','phase','week','done']]; TOPICS.forEach(t=> rows.push([t.id,t.title,t.phase,t.week,!!state.done[t.id]])); const csv = rows.map(r => r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\r\n'); const blob=new Blob([csv],{type:'text/csv'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='devops_roadmap_progress.csv'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url); }

function importFile(e){ const f = e.target.files[0]; if(!f) return; const reader = new FileReader(); reader.onload = ()=>{ const txt = reader.result; try{ const j = JSON.parse(txt); if(j.done){ state.done = j.done; persist(); renderTimeline(); renderProgress(); alert('Imported JSON progress'); return; } } catch(err){} // try CSV
  const lines = txt.split(/\r?\n/).map(l=>l.trim()).filter(Boolean); const hdr = lines[0].split(',').map(h=>h.replace(/^"|"$/g,'').toLowerCase()); const idIdx = hdr.indexOf('id'), doneIdx = hdr.indexOf('done'); if(idIdx>=0 && doneIdx>=0){ for(let i=1;i<lines.length;i++){ const cols = parseCsvLine(lines[i]); const id = cols[idIdx]; const doneVal = cols[doneIdx]; if(id) state.done[id] = (String(doneVal).toLowerCase()==='true' || doneVal==='1'); } persist(); renderTimeline(); renderProgress(); alert('Imported CSV progress'); return; } alert('Unable to parse file'); }; reader.readAsText(f); e.target.value=''; }

window.addEventListener('change', (e)=>{ if(e.target && e.target.id==='importFile') importFile(e); });

function parseCsvLine(line){ const out=[]; let cur=''; let inQ=false; for(let i=0;i<line.length;i++){ const ch=line[i]; if(ch==='"'){ if(inQ && line[i+1]==='"'){ cur+='"'; i++; } else { inQ=!inQ; } continue; } if(ch===',' && !inQ){ out.push(cur); cur=''; continue; } cur+=ch; } out.push(cur); return out.map(s=>s.trim()); }

/* ======= Init ======= */
renderSidebar(); renderTimeline(); renderProgress();

// wire header controls for export/import
document.getElementById('exportJson').addEventListener('click', exportJson);
document.getElementById('exportCsv').addEventListener('click', exportCsv);
document.getElementById('importFile').addEventListener('change', importFile);

// theme toggle in header
const headerToggle = document.getElementById('themeToggle');
headerToggle.checked = state.theme==='light';
headerToggle.addEventListener('change', ()=> applyTheme(headerToggle.checked? 'light':'dark'));

/* keyboard shortcut: g toggles all */
document.addEventListener('keydown', (e)=>{ if(e.key==='g'){ const allDone = Object.values(state.done).filter(Boolean).length === TOPICS.length; TOPICS.forEach(t=> state.done[t.id]=!allDone); persist(); renderTimeline(); renderProgress(); } });
