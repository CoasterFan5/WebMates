<script>
	import Monaco from '$lib/components/Monaco.svelte';
	let editorContent = "console.log('Hello world!')";
	let language = 'html'

	$: console.log(editorContent)
</script>

<div class="editor">
	<Monaco
		bind:value={editorContent}
		language={language}
	/>
</div>

<style>
	.editor {
		width: 100%;
		height: 100vh;
	}
</style>
