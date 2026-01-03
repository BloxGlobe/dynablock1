// load footer css once
if (!document.getElementById("footer-css")) {
  const link = document.createElement("link");
  link.id = "footer-css";
  link.rel = "stylesheet";
  link.href = "src/utils/css/footers.css/footer.css";
  document.head.appendChild(link);
}

export default function initFooter(container) {
  if (!container) return;

  container.innerHTML = `
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-left">
          <strong>DynaBlocks</strong>
          <span>© ${new Date().getFullYear()}</span>
        </div>

        <div class="footer-links">
          <a href="#about">About</a>
          <a href="#terms">Terms</a>
          <a href="#privacy">Privacy</a>
          <a href="#help">Help</a>
        </div>
      </div>
    </footer>
  `;
}
