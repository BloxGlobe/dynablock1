<script>
  import { onMount } from "svelte";

  // Load CSS once
  onMount(() => {
    if (!document.getElementById("library-css")) {
      const link = document.createElement("link");
      link.id = "library-css";
      link.rel = "stylesheet";
      link.href = "src/utils/css/library.css";
      document.head.appendChild(link);
    }
  });

  // Data arrays
  const recentUsers = [
    { id: 1, name: "Alex" },
    { id: 2, name: "BuilderGuy" },
    { id: 3, name: "PixelDev" }
  ];

  const communities = [
    { id: 1, name: "DynaBlocks" },
    { id: 2, name: "Game Builders" },
    { id: 3, name: "UI Designers" }
  ];

  const savedItems = [
    { id: 1, label: "Saved Item" },
    { id: 2, label: "Pinned Resource" }
  ];

  // Event handlers
  function handleSeeAll(section) {
    console.log(`See all clicked for: ${section}`);
  }

  function handleUserClick(name) {
    console.log(`User clicked: ${name}`);
  }

  function handleCommunityClick(name) {
    console.log(`Community clicked: ${name}`);
  }

  function handleSavedClick(label) {
    console.log(`Saved item clicked: ${label}`);
  }
</script>

<div class="library-page">
  <header class="library-header">
    <h1>Library</h1>
    <p>Your activity, communities, and saved content</p>
  </header>

  <!-- Recent Users -->
  <section class="library-section">
    <div class="section-header">
      <h2>Recent Users</h2>
      <button type="button" class="see-all" on:click={() => handleSeeAll('users')}>
        See All
      </button>
    </div>

    <div class="card-row">
      {#each recentUsers as user (user.id)}
        <button
          type="button"
          class="library-card user-card"
          on:click={() => handleUserClick(user.name)}
        >
          <div class="avatar"></div>
          <span>{user.name}</span>
        </button>
      {/each}
    </div>
  </section>

  <!-- Communities -->
  <section class="library-section">
    <div class="section-header">
      <h2>Communities</h2>
      <button type="button" class="see-all" on:click={() => handleSeeAll('communities')}>
        See All
      </button>
    </div>

    <div class="card-row">
      {#each communities as community (community.id)}
        <button
          type="button"
          class="library-card community-card"
          on:click={() => handleCommunityClick(community.name)}
        >
          <div class="icon"></div>
          <span>{community.name}</span>
        </button>
      {/each}
    </div>
  </section>

  <!-- Saved / Favorites -->
  <section class="library-section">
    <div class="section-header">
      <h2>Saved</h2>
      <button type="button" class="see-all" on:click={() => handleSeeAll('saved')}>
        See All
      </button>
    </div>

    <div class="card-row">
      {#each savedItems as item (item.id)}
        <button
          type="button"
          class="library-card generic-card"
          on:click={() => handleSavedClick(item.label)}
        >
          <div class="icon"></div>
          <span>{item.label}</span>
        </button>
      {/each}
    </div>
  </section>
</div>