<script>
    const { data } = $props();

    const { isbn, title, editor, format, pages, cover_url, quantity } = data.book;
</script>

<div id="book-info-view">
    <img src="{cover_url}" alt="couverture du livre {title}">
    <div id=scroll-container>
        <div id="transparent">

        </div>
        <section id="book-info">
            <h1>{title} <br> {editor}</h1>
            <h2>Informations supplémentaires</h2>
            <h3>ISBN</h3>
            {isbn}
            <h3>Format</h3>
            {format}
            <h3>Taille</h3>
            {pages} pages.
            <h3>Nombre d'exemplaires</h3>
            {quantity}
            {#if data.currentBorrowers.length != 0}
                <h2>Actuellement emprunté par</h2>
                <ul>
                    {#each data.currentBorrowers as borrower}
                        <li>{borrower.firstname} {borrower.lastname}</li>
                    {/each}
                </ul>
            {/if}
            {#if data.borrowed}
                <form method="POST" action="?/unborrow">
                    <input hidden name="isbn" value={isbn}>
                    <button class="borrowed-by-me">Rendre</button>
                </form>
            {:else}
                <form method="POST" action="?/borrow">
                    <input hidden name="isbn" value={isbn}>
                    <button disabled={data.currentBorrowers.length == quantity}>Emprunter 
                        {#if quantity > 1}
                            ({data.currentBorrowers.length}/{quantity}) dispo{(data.currentBorrowers.length == quantity - 1) ? '' : 's'}
                        {/if}
                    </button>
                </form>
            {/if}
        </section>
    </div>
</div>

<style>
    #book-info-view {
        height: calc(100vh - 56px - 2em);
        overflow: scroll;
        display: grid;
        grid-template-areas: "container";
    }

    img {
        width: 100%;
        grid-area: container;
        border-radius: 12px;
    }

    #transparent {
        height: 40vh;
    }

    #scroll-container {
        grid-area: container;
        overflow: scroll;
    }

    #book-info {
        background-color: white;
        border-radius: 20px 20px 0px 0px;
        box-shadow: 0px -5px 15px black;
        padding-block: 10px;
    }

    #book-info::before {
        content: '';
        display: block;
        background-color: lightgray;
        height: 5px;
        width: 5em;
        margin-inline: auto;
        position: relative;
        top: 5px;
        border-radius: 20px;
    }

    h1 {
        text-align: center;
        font-size: 1.9em;
    }

    h3 {
        margin-bottom: .42em;
    }

    button {
        background: orange;
        border: none;
        border-radius: 25px;
        padding: 1em;
        color: white;
    }

    button:disabled {
        background: lightgray;
    }

    button.borrowed-by-me {
        background: red;
    }

    form {
        display: grid;
        margin-top: 1em;
    }
</style>