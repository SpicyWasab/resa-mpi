<script>
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div id="main-wrapper">
	<header>
		<h2>Résa MPI</h2>
	</header>
	<main>
		{@render children?.()}
	</main>
</div>

<style>
	#main-wrapper {
		display: grid;
		grid-template-rows: 56px auto;
		height: 100%;
		background-color: orange;
	}

	header {
		color: white;
		font-weight: bold;
	}

	main {
		border-radius: 20px 20px 0px 0px;
		background-color: white;
	}

	header, main {
		padding: 1em;
	}

	h2 {
		padding: 0;
		margin: 0;
	}
</style>