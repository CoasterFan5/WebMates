<script lang='ts'>
	import type Monaco from 'monaco-editor';
	import loader from '@monaco-editor/loader';
	import { onMount } from 'svelte';
	export let value: string = "console.log('Hello world!')";
	export let language: string = 'javascript';
	export let theme: string = 'vs-dark';

	let container: HTMLDivElement;
	let monaco: typeof Monaco.editor;

	onMount(() => {
		loader.init().then(m => {
			m.editor.create(container, {
				value: value,
				language: language,
				theme: theme,
			});
			monaco = m.editor;
			monaco.getModels()[0].onDidChangeContent(() => {
				value = monaco.getModels()[0].getValue();
			});
		});
	});



	
	
</script>


<div bind:this={container} class="container">

</div>

<style>
	.container {
		width: 100%;
		height: 100%;
	}
</style>

