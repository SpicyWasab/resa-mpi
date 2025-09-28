<script>
    import { scanResult } from "../store";
</script>

<form method="POST" action="/login">
    <label>
        Identifiant :
        <input name="id" type="text" bind:value={$scanResult} placeholder="code-barre à l'arrière de la carte du lycée">
    </label>
    <button>Se connecter</button>
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