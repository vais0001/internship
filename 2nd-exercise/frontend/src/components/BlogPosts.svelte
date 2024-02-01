<script>
  import { onMount } from 'svelte';
    
  let blogPosts = [];
    
  onMount(async () => {
    const response = await fetch('http://localhost:3001/api/posts/liked-by-user-8');

    if (response.ok) {
      blogPosts = await response.json();
      console.log(blogPosts); // Add this line to log the response
    } else {
      console.error('Error fetching posts');
    }
  });
</script>
  
{#each blogPosts as post}
  <div>
    <h1>{post.user_id}</h1>
    <p>{post.post}</p>
  </div>
{/each}
  