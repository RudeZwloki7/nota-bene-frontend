<script>
    import { Button, Navbar, NavbarBrand } from "sveltestrap";
    import "./Header.css";
    import { Router, Route, Link, useNavigate } from "svelte-navigator";
    import { getContext } from "svelte";
    import { is_authorized, user_name } from "../../stores.js";

    let color = "#ff3e00";

    const navigate = useNavigate();

    const handleAuth = async () => {
        $is_authorized = false;
        $user_name = "undefined";
    };
</script>

<Navbar>
    <div
        style="color: {color};"
        class="navbar-brand"
        on:click={() => navigate("/welcome")}
    >
        Nota Bene
    </div>

    <div>
        {#if !$is_authorized}
            <button
                class="btn"
                to="login"
                style="background-color: {color}; color: white"
                on:click={() => navigate("login", { replace: true })}
            >
                Login
            </button>
            <button
                class="btn"
                to="register"
                style="background-color: {color}; color: white"
                on:click={() => navigate("register", { replace: true })}
            >
                Register
            </button>
        {:else}
            <h4 
                class="d-inline p-2"
            >
                Hello, {$user_name}
            </h4>

            <Button 
                style="background-color: {color};" 
                on:click="{() => navigate("/home")}"
            >
            Home
            </Button>

            <Button 
                style="background-color: {color};" 
                on:click={handleAuth}
            >
                Logout
            </Button>
        {/if}
    </div>
</Navbar>
