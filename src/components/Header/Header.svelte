<script>
    import { Button, Navbar, NavbarBrand } from "sveltestrap";

    let is_authorized = false;

    function handleAuth(){
        is_authorized = !is_authorized
    }
</script>

<Navbar>
    <NavbarBrand  style="color: #ff3e00; text-decoration: none;">Nota Bene</NavbarBrand>
    <div>
        {#if !is_authorized}
            <Button on:click={handleAuth}>Login</Button>
            <Button>Register</Button>
        {:else}
            <h4 class='d-inline p-2'>Hello, user</h4>
            <Button on:click={handleAuth}>Logout</Button>
        {/if}
    </div>
</Navbar>
