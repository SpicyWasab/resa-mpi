<script>
    const { data } = $props();
</script>

<h1>Confirmation</h1>
Il y a déjà {data.qty} {data.qty == 1 ? "livre" : "livres"} avec l'ISBN {data.isbn} dans la base de donnée.
Ajouter quand-même ?

<form method="POST">
    <input hidden type="text" name="isbn" value={data.isbn}>
    <button>Ajouter</button>
    <a href="/">Retour</a>
</form>

<style>
    button {
        background: orange;
        border: none;
        border-radius: 25px;
        padding: 1em;
        color: white;
        font-size: 1em;
    }

    a {
        background: orange;
        border: none;
        border-radius: 25px;
        color: white;
        padding: 1em;
        text-align: center;
        text-decoration: none;
        line-height: 1.5em;
        font-size: 1em;
    }

    form {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1em;
    }
</style>