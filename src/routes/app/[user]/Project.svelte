<script lang='ts'>
	type Project = {
		name: string;
		id: string;
	}
	export let username: string;
	export let project: Project;
	console.log(project)
</script>


<a class="wrap" href="{username}/{project.id}">
	<h2>{project.name}</h2>
</a>


<style>
	.wrap {
		width: 100%;
		background: var(--color-dark);
		padding: 5px;
		box-sizing: border-box;
		color: var(--color-text);
		margin: 5px 0px;
		text-decoration: none;
		transition: all 0.2s ease-in-out;
	}
	.wrap:hover {
		background: var(--color-light);
	}
	h2 {
		margin: 0px;
		font-weight: 300;
	}
</style>

