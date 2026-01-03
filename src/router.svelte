<script>
  import { onMount } from "svelte";

  let container;
  let links;

  function setActive(page) {
    links.forEach(link => {
      link.classList.toggle("active", link.dataset.page === page);
    });
  }

  async function render(page) {
    setActive(page);

    try {
      const module = await import(`./pages/${page}.svelte`);
      container.innerHTML = "";
      module.default(container);
    } catch {
      container.innerHTML = `
        <h1>404</h1>
        <p>Page "${page}" not found.</p>
      `;
    }
  }

  function navigate(page) {
    if (location.hash !== `#${page}`) {
      location.hash = page;
    } else {
      render(page);
    }
  }

  onMount(() => {
    container = document.getElementById("mainContent");
    links = document.querySelectorAll(".nav-link");

    if (!container) {
      console.error("Router: #mainContent missing");
      return;
    }

    // click handling (router OWNS navigation)
    links.forEach(link => {
      link.addEventListener("click", () => {
        navigate(link.dataset.page);
      });
    });

    // hash handling
    window.addEventListener("hashchange", () => {
      const page = location.hash.replace("#", "") || "home";
      render(page);
    });

    // initial load
    navigate(location.hash.replace("#", "") || "home");
  });
</script>
