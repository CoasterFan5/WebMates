<script>
	import Monaco from 'svelte-monaco';
	let editorContent = "console.log('Hello world!')";
	let language = 'html'
	let file = 'index.html'

	$: console.log(editorContent)
</script>

<div class="editor">
	<Monaco
		options={{
			language: language,
			theme: "vs-dark"
		}}
		bind:value={editorContent}
	/>
</div>

<style>
	.editor {
		width: 100%;
		height: 100vh;
	}
</style>
