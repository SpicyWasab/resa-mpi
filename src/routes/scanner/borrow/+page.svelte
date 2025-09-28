<script>
    import { scanResult } from "../store";
</script>

<form method="POST">
    <label>
        ISBN livre :
        <input name="isbn" type="text" bind:value={$scanResult} placeholder="Code-barre / ISBN au dos du livre">
    </label>
    <button>Emprunter le livre</button>
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