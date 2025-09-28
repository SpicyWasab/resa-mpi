<script>
    import { scanResult } from "../store";

    let buttonLabel = $derived($scanResult?.length != 13 ? "Ajouter manuellement" : "Récupérer infos");
</script>

<form method="POST">
    <label>
        ISBN livre :
        <input name="isbn" type="text" bind:value={$scanResult}>
    </label>
    <button>{buttonLabel}</button>
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