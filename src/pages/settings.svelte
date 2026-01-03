<script>
  import { onMount, onDestroy } from "svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let isOpen = false;
  export let anchorElement = null;

  let panelPosition = { top: 0, right: 0 };

  onMount(() => {
    // Load CSS once
    if (!document.getElementById("settings-css")) {
      const link = document.createElement("link");
      link.id = "settings-css";
      link.rel = "stylesheet";
      link.href = "src/utils/css/setting.css";
      document.head.appendChild(link);
    }

    // Add event listeners
    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("keydown", handleEscKey);

    // Position panel
    if (isOpen && anchorElement) {
      updatePosition();
    }
  });

  onDestroy(() => {
    // Cleanup event listeners
    document.removeEventListener("click", handleOutsideClick);
    document.removeEventListener("keydown", handleEscKey);
  });

  function updatePosition() {
    if (!anchorElement) return;

    const rect = anchorElement.getBoundingClientRect();
    panelPosition = {
      top: rect.bottom + 8,
      right: window.innerWidth - rect.right
    };
  }

  function handleOutsideClick(e) {
    if (!isOpen) return;

    const panel = document.getElementById("settings-panel");
    if (
      panel &&
      !panel.contains(e.target) &&
      !e.target.closest(".settings-btn")
    ) {
      closeSettings();
    }
  }

  function handleEscKey(e) {
    if (e.key === "Escape" && isOpen) {
      closeSettings();
    }
  }

  function closeSettings() {
    isOpen = false;
    dispatch("close");
  }

  function handleAction(action) {
    switch (action) {
      case "settings":
        console.log("Open settings page");
        dispatch("navigate", { page: "settings" });
        break;

      case "help":
        console.log("Open help & safety");
        dispatch("navigate", { page: "help" });
        break;

      case "switch":
        console.log("Switch accounts");
        dispatch("switchAccount");
        break;

      case "logout":
        console.log("Logout");
        dispatch("logout");
        break;
    }

    closeSettings();
  }

  // Reactive: Update position when opened
  $: if (isOpen && anchorElement) {
    updatePosition();
  }
</script>

{#if isOpen}
  <div
    id="settings-panel"
    style="top: {panelPosition.top}px; right: {panelPosition.right}px;"
  >
    <div class="settings-dropdown">
      <button
        type="button"
        class="settings-item"
        on:click={() => handleAction("settings")}
      >
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3" />
          <path
            d="M12 1v6m0 6v6M1 12h6m6 0h6M4.9 4.9l4.2 4.2m5.8 5.8 4.2 4.2M4.9 19.1l4.2-4.2m5.8-5.8 4.2-4.2"
          />
        </svg>
        Settings
      </button>

      <button
        type="button"
        class="settings-item"
        on:click={() => handleAction("help")}
      >
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
        Help & Safety
      </button>

      <button
        type="button"
        class="settings-item"
        on:click={() => handleAction("switch")}
      >
        <svg viewBox="0 0 24 24">
          <path d="M16 3h5v5" />
          <path d="M21 3l-7 7" />
          <path d="M8 21H3v-5" />
          <path d="M3 21l7-7" />
        </svg>
        Switch Accounts
      </button>

      <div class="settings-divider"></div>

      <button
        type="button"
        class="settings-item danger"
        on:click={() => handleAction("logout")}
      >
        <svg viewBox="0 0 24 24">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <path d="M16 17l5-5-5-5" />
          <path d="M21 12H9" />
        </svg>
        Logout
      </button>
    </div>
  </div>
{/if}