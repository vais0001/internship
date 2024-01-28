<script>
    import { onMount } from 'svelte';
    let posts = []; // Initialize an empty array for the posts
  
    onMount(async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts'); //API call to fetch the data
        posts = await response.json(); //Store the data in the array
    });
</script>

<div class="min-h-screen bg-gray-100 py-10">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {#each posts as post}
            {#if post.userId == 8} <!--Show only the posts from user 8-->
                <div class="bg-white shadow-md rounded-lg overflow-hidden my-4">
                    <div class="p-6">
                        <h2 class="text-2xl font-semibold text-gray-800 mb-2">
                            Title: {post.title}
                        </h2>
                        <p class="text-gray-700 text-base mb-4">
                            Body: {post.body}
                        </p>
                        <p class="text-gray-600 text-sm">
                            User: {post.userId}
                        </p>
                    </div>
                </div>
            {/if}
        {/each}
    </div>
</div>