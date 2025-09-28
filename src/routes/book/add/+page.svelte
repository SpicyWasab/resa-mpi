<script>
    let { data } = $props();

    let values = $state("values" in data ? data.values : { });
</script>

<h1>Ajouter un livre</h1>

<form method="POST">
    <label>
        ISBN (requis) :
        <input required=true name="isbn" type="text" bind:value={values.isbn}>
    </label>

    <label>
        Titre (requis) :
        <input required=true name="title" type="text" bind:value={values.title}>
    </label>

    <label>
        Éditeur :
        <input name="editor" type="text" bind:value={values.editor}>
    </label>

    <label>
        Format :
        <input name="format" type="text" bind:value={values.format}>
    </label>

    <label>
        Nombre de pages :
        <input name="pages" type="number" bind:value={values.pages}>
    </label>

    <label>
        URL vers l'image de la couverture :
        <input name="cover" type="text" bind:value={values.cover}>
    </label>
    <button>Ajouter</button>
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
        gap: 2em;
    }

    label {
        display: flex;
        flex-direction: column;
        text-align: left;
    }

    input {
        border-radius: 25px;
        padding: 1em;
    }

    button {
        background: orange;
        border: none;
        border-radius: 25px;
        padding: 1em;
        color: white;
    }
</style>