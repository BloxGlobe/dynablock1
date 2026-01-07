// Load CSS once
if (!document.getElementById("resources-css")) {
  const link = document.createElement("link");
  link.id = "resources-css";
  link.rel = "stylesheet";
  link.href = "src/pages/page-modules/resources-module/resources.css";
  document.head.appendChild(link);
}

export default function initResources(container) {
  if (!container) return;

  container.innerHTML = `
    <div id="userBanner" style="margin-bottom:12px"></div>
    
    <div class="resources-page">
      <header class="resources-header">
        <h1>Resources</h1>
        <p>Explore tools, tutorials, and community assets</p>
      </header>

      <div class="resources-grid">
        ${renderResourceCard("Documentation", "📚", "Complete guides and API references")}
        ${renderResourceCard("Tutorials", "🎓", "Step-by-step learning resources")}
        ${renderResourceCard("Templates", "📦", "Pre-built project templates")}
        ${renderResourceCard("Assets", "🎨", "Graphics, models, and more")}
        ${renderResourceCard("Tools", "🔧", "Development utilities")}
        ${renderResourceCard("Community", "👥", "Forums and discussions")}
      </div>
    </div>
  `;

  setupResourceEvents();
}

function renderResourceCard(title, icon, description) {
  return `
    <div class="resource-card">
      <div class="resource-icon">${icon}</div>
      <h3>${title}</h3>
      <p>${description}</p>
      <button class="resource-btn">Explore</button>
    </div>
  `;
}

function setupResourceEvents() {
  const buttons = document.querySelectorAll('.resource-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.resource-card');
      const title = card.querySelector('h3').textContent;
      alert(`Opening ${title}...`);
    });
  });
}

window.initResources = initResources;
