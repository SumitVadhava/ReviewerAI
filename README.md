<h1>🤖 Reviewer AI</h1>
  <p>An AI-powered code review platform built with React, .NET, Python (Model API), and SQL Server. Upload code, get intelligent feedback, and improve your projects with ease.</p>

  <h3>✨ Features</h3>
  <ul>
    <li>🔐 User Management: Sign up, log in, and manage user accounts securely.</li>
    <li>📂 Code Upload: Upload code snippets or files for review.</li>
    <li>🤖 AI-Powered Reviews: Leverage Python-based LLM integration (e.g., Gemini) for detailed code analysis.</li>
    <li>💾 Database Storage: Store users, code files, and review history in SQL Server.</li>
    <li>📊 History & Retrieval: Access past reviews anytime.</li>
  </ul>


  <h3>🏗️ Architecture</h3>
  <p>React (Frontend) → .NET (Backend API) || Python Model API (AI Reviewer) → SQL Server (Database)</p>

  <h3>📦 Tech Stack</h3>
  <p><strong>Frontend:</strong> ReactJs</p>
  <p><strong>Backend:</strong> .NET 9.0</p>
  <p><strong>API:</strong> Python</p>
  <p><strong>Database:</strong> MS SQL</p>


  <h3>🚀 Quick Start</h3>
  <h4>Clone the Repository</h4>
  <pre>
git clone https://github.com/your-username/reviewer-ai.git
cd reviewer-ai
  </pre>

  <h4>Set Up the Database</h4>
  <p>Configure SQL Server and run scripts in the /database folder.</p>
  <p>Update the connection string in server/appsettings.json.</p>

  <h4>Run the Backend (.NET)</h4>
  <pre>
cd server
dotnet restore
dotnet run
  </pre>

  <h4>Run the Model API (Python)</h4>
  <pre>
cd Python_Server
pip install -r requirements.txt
python app.py
  </pre>

  <h4>Run the Frontend (React)</h4>
  <pre>
cd client
npm install
npm start
  </pre>
  <p>The app will be available at <a href="http://localhost:3000">http://localhost:3000</a>.</p>


  <h3>🗂️ Folder Structure</h3>
  <pre>
reviewer-ai/
├── client/          # React UI
├── server/          # .NET Web API
├── Python_Server/   # Python AI service
└── README.md
  </pre>

  
  <h3>⚡ API Flow</h3>
  <ol>
    <li>React frontend sends authentication and file upload requests to the .NET API.</li>
    <li>.NET API stores code in SQL Server and forwards it to the Python Model API.</li>
    <li>Python Model API returns AI-generated reviews, which .NET persists in the database.</li>
    <li>React fetches and displays the reviews to the user.</li>
  </ol>

  <h3>🔮 Future Enhancements</h3>
  <ul>
    <li>🐳 Docker Compose for simplified deployment.</li>
    <li>📈 Analytics dashboard for code quality trends.</li>
    <li>🔔 Notifications via Email or Slack.</li>
  </ul>

  
  <h3>🤝 Contributing</h3>
  <p>Fork the repository.</p>
  <p>Create a branch: <code>git checkout -b feature/your-feature</code>.</p>
  <p>Commit changes: <code>git commit -m "feat: add your feature"</code>.</p>
  <p>Push to the branch: <code>git push origin feature/your-feature</code>.</p>
  <p>Open a pull request with a clear description (follow conventional commits).</p>

  <h3>📜 License</h3>
  <p>MIT License</p>
  
  <hr>
  
  <h4>Built with ❤️ by Sumit Vadhava</h4>
