<script>
  import { onMount } from "svelte";

  // load css once
  onMount(() => {
    if (!document.getElementById("communities-css")) {
      const link = document.createElement("link");
      link.id = "communities-css";
      link.rel = "stylesheet";
      link.href =
        "src/pages/page-modules/communities-module/communities-css/communities.css";
      document.head.appendChild(link);
    }
  });

  let communities = [];
  let currentCommunity = null;
  let searchQuery = "";

  function selectCommunity(id) {
    currentCommunity = communities.find(c => c.id === id);
  }

  function formatMembers(n) {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
    if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
    return String(n);
  }

  $: filteredCommunities =
    searchQuery.trim() === ""
      ? communities
      : communities.filter(c =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
</script>

<div class="communities-layout">
  <!-- LEFT SIDEBAR -->
  <aside class="communities-sidebar">
    <div class="sidebar-header">Communities</div>

    <div class="search-communities">
      <input
        type="text"
        placeholder="Search communities"
        bind:value={searchQuery}
      />
    </div>

    <div class="communities-list">
      {#if !Array.isArray(filteredCommunities) || filteredCommunities.length === 0}
        <div class="empty">No joined communities</div>
      {:else}
        {#each filteredCommunities as c (c.id)}
          <button
            type="button"
            class="community-item"
            class:active={currentCommunity?.id === c.id}
            on:click={() => selectCommunity(c.id)}
          >
            <img src={c.icon} alt={c.name} />
            <div class="community-meta">
              <div class="community-name">{c.name}</div>
              <div class="community-members">
                {formatMembers(c.members)} members
              </div>
            </div>
          </button>
        {/each}
      {/if}
    </div>
  </aside>

  <!-- MAIN CONTENT -->
  <main class="community-content">
    {#if !currentCommunity}
      <div class="empty-state">
        <h2>Not in any communities</h2>
        <p>Join a community to see its content here</p>
      </div>
    {:else}
      <div class="community-banner">
        <img
          class="community-avatar"
          src={currentCommunity.icon}
          alt={currentCommunity.name}
        />
        <div class="community-info">
          <h1>{currentCommunity.name}</h1>
          <div class="community-creator">
            By {currentCommunity.creator}
          </div>
          <div class="community-stats">
            <span>
              {formatMembers(currentCommunity.members)} Members
            </span>
            {#if currentCommunity.rank}
              <span>{currentCommunity.rank}</span>
            {/if}
          </div>
        </div>
      </div>

      <div class="community-tabs">
        <button type="button" class="active">About</button>
        <button type="button">Store</button>
      </div>

      <section class="community-section">
        <h3>Description</h3>
        <p>
          {currentCommunity.description || "No description provided."}
        </p>
      </section>

      <section class="community-section">
        <h3>Shout</h3>

        {#if !currentCommunity.shouts || currentCommunity.shouts.length === 0}
          <div class="empty">No shouts yet</div>
        {:else}
          {#each currentCommunity.shouts as s (s.author + s.time)}
            <div class="shout-item">
              <img src={s.avatar} alt={s.author} />
              <div>
                <div class="shout-header">
                  <strong>{s.author}</strong>
                  <span>{s.time}</span>
                </div>
                <div>{s.text}</div>
              </div>
            </div>
          {/each}
        {/if}
      </section>

      <section class="community-section">
        <h3>Members</h3>
        <div class="members-row">
          {#if !currentCommunity.members_list || currentCommunity.members_list.length === 0}
            <div class="empty">No members</div>
          {:else}
            {#each currentCommunity.members_list.slice(0, 20) as m (m.name)}
              <img
                class="member-avatar"
                src={m.avatar}
                title={m.name}
                alt={m.name}
              />
            {/each}
          {/if}
        </div>
      </section>
    {/if}
  </main>
</div>