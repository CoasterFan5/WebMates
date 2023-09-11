<script lang='ts'>
	export let username: string | null;
</script>


<div class="header">
	<div class="headerInner">
		<h1>@{username}</h1>
	</div>
</div>


<style>
	.header {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		background: var(--color-dark);
		color: var(--color-text);
	}
	.headerInner {
		display: flex;
		align-items: start;
		justify-content: start;
		width: 90%;
	}
	.headerInner h1 {
		font-size: 2rem;
		font-weight: 600;
		margin: 5px;
	}
</style>