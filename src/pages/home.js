// src/pages/home.js

function loadHomeCSS() {
  if (document.getElementById("home-friend-css")) return;

  const link = document.createElement("link");
  link.id = "home-friend-css";
  link.rel = "stylesheet";
  link.href = "src/utils/css/friends.css/friend.css";
  document.head.appendChild(link);
}

function loadRegisterLoginCSS() {
  if (document.getElementById("register-login-css")) return;
  const link = document.createElement("link");
  link.id = "register-login-css";
  link.rel = "stylesheet";
  link.href = "src/utils/css/register-login.css";
  document.head.appendChild(link);
}

function initHome(container) {
  loadHomeCSS();

  container.innerHTML = `
    <section class="section">
      <div id="authContainer"></div>
    </section>

    <h1 class="page-title">Home</h1>

    <!-- Friends Section -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">Friends</h2>
      </div>

      <div class="friends-container" id="friendsContainer">
        <div class="friend-item add-friend">
          <div class="friend-avatar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
          <span class="friend-name">Add Friend</span>
        </div>
      </div>
    </section>

    <!-- Recommended Section -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">Recommended For You</h2>
      </div>
      <div class="library-grid" id="recommendedGrid"></div>
    </section>

    <!-- Resources Section -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">Resources</h2>
      </div>
      <div class="continue-grid" id="resourcesGrid"></div>
    </section>

    <!-- Favourites Section -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">Favourites</h2>
      </div>
      <div class="continue-grid" id="favouritesGrid"></div>
    </section>
  `;

  setTimeout(() => {
    loadRegisterLoginCSS();
    import("../components/common/RegisterLogin.js").then(mod => {
      try { mod.mountRegisterLogin(document.getElementById('authContainer')); } catch(e) {}
    }).catch(()=>{});

    loadFriends();
    loadRecommended();
    loadResources();
    loadFavourites();
    setupEventListeners();
  }, 0);
}

window.initHome = initHome;
export default initHome;