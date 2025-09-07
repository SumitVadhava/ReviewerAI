<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Reviewer AI — README</title>
  <style>
    :root{--bg:#0f1724;--card:#0b1220;--muted:#94a3b8;--accent:#7c3aed;--glass:rgba(255,255,255,0.03)}
    html,body{height:100%;margin:0;font-family:Inter,Segoe UI,Roboto,system-ui,-apple-system,"Helvetica Neue",Arial}
    body{background:linear-gradient(180deg,#071026 0%, #071934 100%);color:#e6eef8;padding:40px}
    .container{max-width:900px;margin:0 auto}
    header{display:flex;align-items:center;gap:16px;margin-bottom:20px}
    .logo{width:64px;height:64px;border-radius:12px;background:linear-gradient(135deg,var(--accent),#06b6d4);display:flex;align-items:center;justify-content:center;font-weight:700;color:white;font-size:28px}
    h1{margin:0;font-size:28px}
    p.lead{color:var(--muted);margin-top:6px}
    .card{background:var(--card);border-radius:12px;padding:18px;margin-top:18px;box-shadow:0 6px 18px rgba(2,6,23,0.6)}
    h2{margin-top:0}
    pre{background:var(--glass);padding:12px;border-radius:8px;overflow:auto;color:#cfe9ff}
    code{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono",monospace}
    .grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
    .badge{display:inline-block;padding:6px 10px;border-radius:999px;background:rgba(255,255,255,0.03);color:var(--muted);font-size:13px}
    ul{line-height:1.6}
    .footer{margin-top:20px;color:var(--muted);font-size:13px}
    .copy-btn{background:transparent;border:1px solid rgba(255,255,255,0.06);color:var(--muted);padding:8px 10px;border-radius:8px;cursor:pointer}
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="logo">AI</div>
      <div>
        <h1>🧑‍💻 Reviewer AI</h1>
        <p class="lead">An AI-powered code reviewer platform — React + .NET + Python (Model API) + SQL Server</p>
        <div style="margin-top:10px">
          <span class="badge">React</span>
          <span class="badge">.NET API</span>
          <span class="badge">Python (LLM)</span>
          <span class="badge">SQL Server</span>
        </div>
      </div>
    </header>

    <section class="card">
      <h2>✨ Features</h2>
      <ul>
        <li>🔐 <strong>User Management</strong> – Sign up, login, and manage accounts.</li>
        <li>📂 <strong>Code Upload</strong> – Upload snippets or files for review.</li>
        <li>🤖 <strong>AI-Powered Reviews</strong> – Python service with LLM integration (Gemini or other models).</li>
        <li>💾 <strong>Database Storage</strong> – SQL Server stores users, code files, and review history.</li>
        <li>📊 <strong>History & Retrieval</strong> – View past reviews anytime.</li>
      </ul>
    </section>

    <section class="card">
      <h2>🏗️ Architecture</h2>
      <pre><code>React (Frontend)  →  .NET (Backend API)  →  SQL Server (Database)
                           ↓
                     Python Model API (AI Reviewer)</code></pre>
    </section>

    <section class="card">
      <h2>📦 Tech Stack</h2>
      <div class="grid">
        <div>
          <h3>Frontend</h3>
          <p>React, Tailwind (optional)</p>
        </div>
        <div>
          <h3>Backend</h3>
          <p>.NET 6/7 (Web API, ADO.NET / EF Core)</p>
        </div>
        <div>
          <h3>Model API</h3>
          <p>Python (FastAPI / Flask + LLM SDK)</p>
        </div>
        <div>
          <h3>Database</h3>
          <p>SQL Server (Stored Procedures)</p>
        </div>
      </div>
    </section>

    <section class="card">
      <h2>🚀 Quick Start</h2>
      <div style="display:flex;gap:12px;flex-direction:column">
        <div>
          <strong>1) Clone</strong>
          <pre><code>git clone https://github.com/your-username/reviewer-ai.git
cd reviewer-ai</code></pre>
        </div>

        <div>
          <strong>2) Database</strong>
          <p>Set up SQL Server and run the scripts in <code>/database</code>. Update the connection string in <code>appsettings.json</code>.</p>
        </div>

        <div>
          <strong>3) Backend (.NET)</strong>
          <pre><code>cd backend
dotnet restore
dotnet run</code></pre>
        </div>

        <div>
          <strong>4) Model API (Python)</strong>
          <pre><code>cd model-api
pip install -r requirements.txt
python app.py</code></pre>
        </div>

        <div>
          <strong>5) Frontend (React)</strong>
          <pre><code>cd frontend
npm install
npm start</code></pre>
        </div>
      </div>
    </section>

    <section class="card">
      <h2>🗂️ Folder Structure</h2>
      <pre><code>reviewer-ai/
├── frontend/        # React UI
├── backend/         # .NET Web API
├── model-api/       # Python AI service
├── database/        # SQL Server scripts & procedures
└── README.md</code></pre>
    </section>

    <section class="card">
      <h2>⚡ API Flow</h2>
      <ol>
        <li>React calls .NET API for auth & file upload.</li>
        <li>.NET stores code and forwards to Python Model API.</li>
        <li>Python returns a review; .NET persists it.</li>
        <li>React fetches and displays the review.</li>
      </ol>
    </section>

    <section class="card">
      <h2>🔮 Future Enhancements</h2>
      <ul>
        <li>📝 Multi-language support</li>
        <li>🐳 Docker Compose for easier deployment</li>
        <li>📈 Analytics for code quality trends</li>
        <li>🔔 Notifications via Email/Slack</li>
      </ul>
    </section>

    <section class="card">
      <h2>🤝 Contributing</h2>
      <p>Fork → branch → commit → PR. Please follow conventional commits and write clear PR descriptions.</p>
    </section>

    <section class="card">
      <h2>📜 License</h2>
      <p>MIT License</p>
      <div class="footer">Built with ❤️ by Sumit</div>
    </section>

  </div>

  <script>
    // optional: add copy-to-clipboard for the first code block
    function copyFirst() {
      const el = document.querySelector('pre code');
      if(!el) return;
      const text = el.innerText;
      navigator.clipboard.writeText(text).then(()=>{
        alert('Copied to clipboard!')
      })
    }
  </script>
</body>
</html>
