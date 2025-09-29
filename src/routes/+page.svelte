<script>
    let filter = $state("all");

    let { data } = $props();

    function filtering(book) {
        if(filter == 'borrowed') return book.borrowed;
        else if(filter == 'available') return book.available;
        else if(filter == 'borrowed-by-me') return book.borrowedByMe;
        else return true;
    }
</script>

<div id="home-view">
    <select name="filter-borrowed" bind:value={filter}>
        <option value="all">Tous les livres</option>
        <option value="available">Disponibles</option>
        <option value="borrowed">Empruntés</option>
        <option value="borrowed-by-me">Empruntés par moi</option>
    </select>
    <div id="books">
        {#each data.books.filter(filtering) as book}
            <a href="/book/{book.isbn}" class="book-card">
                <img src={book.cover} alt="couverture du {book.title}">
                <div class="cover-filter"></div>
                <div class="book-data">
                    <span class="title">{book.title}</span>
                </div>
            </a>
        {/each}
    </div>
    <div id="actions">
        <a href="/scanner/add">Ajouter</a>
        <a href="/scanner/borrow">Emprunter</a>
    </div>
</div>

<style>
    #home-view {
        height: calc(100vh - 56px - 2em - 56px);
        display: grid;
        grid-template-rows: 56px auto 56px;
        gap: 1em;
    }

    #actions {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1em;
        padding-bottom: 56px;
    }

    a {
        text-decoration: none;
    }

    a:not(.book-card) {
        background: orange;
        border: none;
        border-radius: 25px;
        color: white;
        padding: 1em;
        text-align: center;
        line-height: 1.5em;
    }

    #books {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1em;
        overflow: scroll;
    }

    .book-card {
        display: grid;
        grid-template: "container";
        place-items: center;
        place-content: center;
        border: 1px solid darkslategray;
        border-radius: 10px;
        overflow: hidden;
        height: 220px;
    }

    img {
        width: 100%;
        grid-area: container;
        overflow: hidden;
    }

    .cover-filter {
        grid-area: container;
        place-self: start center;
        
        background-image: linear-gradient(transparent 20%, darkslategray 90%);
        width: 100%;
        height: calc(250px - 2.5em);
    }

    .book-data {
        grid-area: container;
        place-self: end center;
        background-color: darkslategray;
        color: white;
        padding: 10px;
        display: flex;
        flex-direction: column;
        height: 4em;
        width: 100%;
    }

    .title {
        margin: 10px;
    }
</style>