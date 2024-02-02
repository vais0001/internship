<script>
  import { onMount } from 'svelte';
    
  let blogPosts = [];
    
  onMount(async () => {
    const response = await fetch('http://localhost:3001/api/posts/liked-by-user-8');

    if (response.ok) {
      blogPosts = await response.json();
    } else {
      console.error('Error fetching posts');
    }
  });
</script>
  
{#each blogPosts as post} <!--Display posts liked by user 8-->
  <div class="bg-white shadow-md rounded-lg overflow-hidden my-4">
    <div class="p-6">
        <h2 class="text-2xl font-semibold text-gray-800 mb-2">
          Blog id: {post.blog_id}
        </h2>
        <p class="text-gray-700 text-base mb-4">
          Post: {post.post}
        </p>
    </div>
  </div>
{/each}
  