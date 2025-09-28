<script>
	import favicon from '$lib/assets/favicon.svg';

	let { data, children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div id="main-wrapper">
	<header>
		<h2><a href="/">Résa MPI</a></h2>
		{#if data.loggedIn}
			<span>{ data.firstname } { data.lastname[0] }.</span>
			<a href="/logout">
				Logout
			</a>
		{/if}
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
		display: flex;
		align-items: end;
		justify-content: space-between;
		line-height: 1.25em;
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

	h2 a {
		color: white;
	}

	a {
		color: black;
	}
</style>