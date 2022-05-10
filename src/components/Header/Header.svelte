<script>
    import { Button, Navbar, NavbarBrand } from "sveltestrap";
    import "./Header.css";

    let is_authorized = false;
    let color = "#ff3e00";

    function handleAuth() {
        is_authorized = !is_authorized;
    }
</script>

<Navbar>
    <NavbarBrand style="color: {color}; text-decoration: none;"
        >Nota Bene</NavbarBrand
    >
    <div>
        {#if !is_authorized}
            <Button style="background-color: {color};" on:click={handleAuth}>Login</Button>
            <Button style="background-color: {color};">Register</Button>
        {:else} 
            <h4 class="d-inline p-2">Hello, user</h4>
            <Button style="background-color: {color};" on:click={handleAuth}>Logout</Button>
        {/if}
    </div>
</Navbar>
