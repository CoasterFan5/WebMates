<script>
	export let data;
	import Header from './Header.svelte';
	import Project from './Project.svelte';
</script>

<div class="wrap">
	<Header username={data.username} />
	<div class="content">
		<div class="contentInner">
			<div class="panel">
				<h2>Projects</h2>
				{#each data.projects as project}
					<Project project={project} />
				{:else}
					<p>No projects found</p>
				{/each}
				{#if data.owner}
					<form action="?/createProject" method="post">
						<button type="submit">Create</button>
					</form>
					
				{/if}
			</div>
			<div class="panel">
				<h2>Custom Panel</h2>
				<p>Coming soon...</p>
			</div>
		</div>
	</div>
</div>




<style>
	.wrap {
		width: 100%;
		height: 100%;
		min-height: 100vh;
		background: var(--color-bg);
		color: var(--color-text)
	}
	.content {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;	
	}
	.contentInner {
		width: 90%;
		display: flex;
		flex-direction: row;
	}
	.panel {
		width: 50%;
		margin: 20px;
		padding: 10px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-wrap: wrap;
		background: var(--color-darkish);
	}
	@media (max-width: 900px) {
		.contentInner {
			flex-direction: column;
		}
		.panel {
			width: unset;
		}
	}
	h2 {
		font-size: 1.5rem;
		font-weight: 500;
		margin: 5px;
		color: var(--color-text);
	}
	button {
		font-size: 1.2rem;
		margin: 5px;
		padding: 10px;
		border: none;
		border-radius: 5px;
		background: var(--color-light);
		color: var(--color-text);
		cursor: pointer;
		border: 1px solid transparent;
		transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 0.3s;
	}
	button:hover {
		background: var(--color-light);
		scale: 1.1;
	}
</style>