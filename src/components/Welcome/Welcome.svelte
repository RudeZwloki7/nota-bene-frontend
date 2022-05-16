<script>
    import { Jumbotron } from "sveltestrap";
    import { useNavigate } from "svelte-navigator";
    import { is_authorized } from "../../stores";

    const navigate = useNavigate();

    let color = "#ff3e00";

    const handleClick = () => {
        if ($is_authorized) {
            navigate("/home", { replace: true });
        } else {
            navigate("/register", { replace: true });
        }
    };
</script>

<Jumbotron class="mt-5">
    <h1 class="display-4">Hello, dear user!</h1>
    <p class="lead">
        <b class="logo">Nota Bene</b> - is a simple TODO application, where you can track and manage
        your everyday tasks!
    </p>
    <hr class="my-4" />
    <p>
        This application is for free charge of use. All you need - is just
        register if you are new user, or log in your account if you are already
        registered.
    </p>
    <p>
        After authorization, you can create, update, mark as completed and
        delete your tasks! Moreover <b class="logo">Nota Bene</b> support setting up time to
        completion for your tasks.
    </p>
    <p>
        <b> Enjoy it! </b>
    </p>
    <p class="lead">
        <button
            class="btn btn-primary btn-lg"
            style="background-color: {color}; color: white"
            on:click={handleClick}
        >
            Try this now!
        </button>
    </p>
</Jumbotron>

<style>
    .logo {
        color: #ff3e00;
    }
</style>
