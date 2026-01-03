<script>
  import { onMount } from "svelte";

  // Reactive data
  let resources = [];
  let loading = false;
  let searchQuery = "";

  onMount(() => {
    loadResources();
  });

  async function loadResources() {
    loading = true;
    // Replace with your actual API call
    // Example:
    // const response = await fetch('/api/resources');
    // resources = await response.json();
    
    // Placeholder data
    resources = [
      // { id: 1, title: "Resource 1", description: "...", thumbnail: "url" }
    ];
    loading = false;
  }

  function handleResourceClick(resource) {
    console.log("Resource clicked:", resource);
    // Navigate to resource or open it
  }

  $: filteredResources = searchQuery.trim() === ""
    ? resources
    : resources.filter(r =>
        r.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
</script>

<div class="resources-page">
  <header class="page-header">
    <h1>Resources</h1>
    <p>Browse and manage your resources</p>
  </header>

  <div class="search-bar">
    <input
      type="text"
      placeholder="Search resources..."
      bind:value={searchQuery}
    />
  </div>

  <div class="resources-content">
    {#if loading}
      <div class="loading">Loading resources...</div>
    {:else if filteredResources.length === 0}
      <div class="empty-state">
        {#if searchQuery}
          <p>No resources found matching "{searchQuery}"</p>
        {:else}
          <p>No resources available</p>
        {/if}
      </div>
    {:else}
      <div class="resources-grid">
        {#each filteredResources as resource (resource.id)}
          <button
            type="button"
            class="resource-card"
            on:click={() => handleResourceClick(resource)}
          >
            {#if resource.thumbnail}
              <img src={resource.thumbnail} alt={resource.title} />
            {/if}
            <div class="resource-info">
              <h3>{resource.title}</h3>
              {#if resource.description}
                <p>{resource.description}</p>
              {/if}
            </div>
          </button>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .resources-page {
    padding: 2rem;
  }

  .page-header {
    margin-bottom: 2rem;
  }

  .page-header h1 {
    margin: 0 0 0.5rem 0;
  }

  .page-header p {
    margin: 0;
    opacity: 0.7;
  }

  .search-bar {
    margin-bottom: 2rem;
  }

  .search-bar input {
    width: 100%;
    max-width: 500px;
    padding: 0.75rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .loading,
  .empty-state {
    text-align: center;
    padding: 3rem;
    opacity: 0.7;
  }

  .resources-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .resource-card {
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 0;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    text-align: left;
    overflow: hidden;
  }

  .resource-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .resource-card img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }

  .resource-info {
    padding: 1rem;
  }

  .resource-info h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
  }

  .resource-info p {
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.7;
  }
</style>