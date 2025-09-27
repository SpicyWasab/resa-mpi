<script>
    import { scanResult } from "../store";
</script>

<form action="POST">
    <label>
        Identifiant :
        <input type="text" bind:value={$scanResult}>
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