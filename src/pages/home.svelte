<script>
  import { onMount } from "svelte";

  // Load CSS once
  onMount(() => {
    if (!document.getElementById("home-friend-css")) {
      const link = document.createElement("link");
      link.id = "home-friend-css";
      link.rel = "stylesheet";
      link.href = "src/utils/css/friend.css";
      document.head.appendChild(link);
    }

    // Load data when component mounts
    loadFriends();
    loadRecommended();
    loadResources();
    loadFavourites();
  });

  // Reactive data
  let friends = [];
  let recommended = [];
  let resources = [];
  let favourites = [];

  // Load functions (placeholder - replace with actual API calls)
  function loadFriends() {
    // Example: fetch friends from API
    friends = [
      // { id: 1, name: "Friend 1", avatar: "url" },
      // Add your friends data here
    ];
  }

  function loadRecommended() {
    // Example: fetch recommended items
    recommended = [
      // { id: 1, title: "Item 1", thumbnail: "url" },
      // Add your recommended data here
    ];
  }

  function loadResources() {
    // Example: fetch resources
    resources = [
      // { id: 1, title: "Resource 1", thumbnail: "url" },
      // Add your resources data here
    ];
  }

  function loadFavourites() {
    // Example: fetch favourites
    favourites = [
      // { id: 1, title: "Favourite 1", thumbnail: "url" },
      // Add your favourites data here
    ];
  }

  // Event handlers
  function handleAddFriend() {
    console.log("Add friend clicked");
    // Implement add friend functionality
  }

  function handleFriendClick(friend) {
    console.log("Friend clicked:", friend);
    // Navigate to friend profile
  }

  function handleRecommendedClick(item) {
    console.log("Recommended item clicked:", item);
    // Handle recommended item click
  }

  function handleResourceClick(item) {
    console.log("Resource clicked:", item);
    // Handle resource click
  }

  function handleFavouriteClick(item) {
    console.log("Favourite clicked:", item);
    // Handle favourite click
  }
</script>

<div class="home-page">
  <h1 class="page-title">Home</h1>

  <!-- Friends Section -->
  <section class="section">
    <div class="section-header">
      <h2 class="section-title">Friends</h2>
    </div>

    <div class="friends-container">
      <button
        type="button"
        class="friend-item add-friend"
        on:click={handleAddFriend}
      >
        <div class="friend-avatar">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </div>
        <span class="friend-name">Add Friend</span>
      </button>

      {#each friends as friend (friend.id)}
        <button
          type="button"
          class="friend-item"
          on:click={() => handleFriendClick(friend)}
        >
          <div class="friend-avatar">
            {#if friend.avatar}
              <img src={friend.avatar} alt={friend.name} />
            {/if}
          </div>
          <span class="friend-name">{friend.name}</span>
        </button>
      {/each}
    </div>
  </section>

  <!-- Recommended Section -->
  <section class="section">
    <div class="section-header">
      <h2 class="section-title">Recommended For You</h2>
    </div>
    <div class="library-grid">
      {#if recommended.length === 0}
        <div class="empty-state">No recommendations yet</div>
      {:else}
        {#each recommended as item (item.id)}
          <button
            type="button"
            class="grid-item"
            on:click={() => handleRecommendedClick(item)}
          >
            {#if item.thumbnail}
              <img src={item.thumbnail} alt={item.title} />
            {/if}
            <span>{item.title}</span>
          </button>
        {/each}
      {/if}
    </div>
  </section>

  <!-- Resources Section -->
  <section class="section">
    <div class="section-header">
      <h2 class="section-title">Resources</h2>
    </div>
    <div class="continue-grid">
      {#if resources.length === 0}
        <div class="empty-state">No resources yet</div>
      {:else}
        {#each resources as item (item.id)}
          <button
            type="button"
            class="grid-item"
            on:click={() => handleResourceClick(item)}
          >
            {#if item.thumbnail}
              <img src={item.thumbnail} alt={item.title} />
            {/if}
            <span>{item.title}</span>
          </button>
        {/each}
      {/if}
    </div>
  </section>

  <!-- Favourites Section -->
  <section class="section">
    <div class="section-header">
      <h2 class="section-title">Favourites</h2>
    </div>
    <div class="continue-grid">
      {#if favourites.length === 0}
        <div class="empty-state">No favourites yet</div>
      {:else}
        {#each favourites as item (item.id)}
          <button
            type="button"
            class="grid-item"
            on:click={() => handleFavouriteClick(item)}
          >
            {#if item.thumbnail}
              <img src={item.thumbnail} alt={item.title} />
            {/if}
            <span>{item.title}</span>
          </button>
        {/each}
      {/if}
    </div>
  </section>
</div>