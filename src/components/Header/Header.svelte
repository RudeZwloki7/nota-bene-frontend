<script>
    import { Button, Navbar, NavbarBrand } from "sveltestrap";
    import "./Header.css";
    import { Router, Route, Link } from "svelte-navigator";

    let is_authorized = false;
    let color = "#ff3e00";

    function handleAuth() {
        is_authorized = !is_authorized;
    }
</script>

<Router>
    <Navbar>
        <NavbarBrand style="color: {color}; "
            >Nota Bene</NavbarBrand
        >
        <div>
            {#if !is_authorized}
                <Link class='btn' to="login" style="background-color: {color}; text-decoration: none; color: white">Login</Link>
                <Link class='btn' to="register" style="background-color: {color}; text-decoration: none; color: white">Register</Link>
                
                <!-- <Button style="background-color: {color};">Register</Button> -->
            {:else}
                <h4 class="d-inline p-2">Hello, user</h4>
                <Button style="background-color: {color};" on:click={handleAuth}
                    >Logout</Button
                >
            {/if}
        </div>
    </Navbar>
</Router>