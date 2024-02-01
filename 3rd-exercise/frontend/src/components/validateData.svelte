<script>
    import { onMount } from 'svelte';

    let data = [];
    let validationMessages = {};

    onMount(async () => {
        try {
            const response = await fetch('/data.json');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            data = await response.json();
            // Validate each data item after loading
            for (let [index, item] of data.entries()) {
                await validateData(item, index);
            }
        } catch (error) {
            // Handle error if fetching fails
            console.error(error.message);
        }
    });

    async function validateData(item, index) {
        try {
            const response = await fetch('http://localhost:3001/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item)
            });

            const contentType = response.headers.get('content-type');

            if (!response.ok) {
                if (contentType && contentType.includes('application/json')) {
                    const errorResult = await response.json();
                    throw new Error(errorResult.errors.join('\n'));
                }
            }

            // Assuming successful response is always JSON
            const result = await response.json();
            validationMessages[index] = "Validation: " + result.message;
        } catch (error) {
            validationMessages[index] = 'Validation error: ' + error.message;
        }
    }
</script>

{#each data as item, index (index)}
    <div>
        <pre>{JSON.stringify(item, null, 2)}</pre>
        {#if validationMessages[index]}
            <p>{validationMessages[index]}</p>
        {/if}
    </div>
{/each}
