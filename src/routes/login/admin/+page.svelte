<div id="admin-login-view">
    <h1>Connexion (pas de carte)</h1>

    <form method="POST" action="/login/?">
        <label>
            Identifiant
            <input name="id" type="text">
        </label>
        <button>Se connecter</button>
    </form>
</div>

<style>
    #admin-login-view {
        display: flex;
        flex-direction: column;
        text-align: center;
    }

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