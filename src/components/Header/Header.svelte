<script>
    import { Button, Navbar, NavbarBrand } from "sveltestrap";
    import "./Header.css";
    import { Router, Route, Link } from "svelte-navigator";
    import {getContext} from 'svelte'
    import {is_authorized, user_name} from '../../stores.js'

    let color = "#ff3e00";

    const handleAuth = async () =>{
        $is_authorized = false;
        $user_name = "undefined";
    }

</script>

<Router>
    <Navbar>
        <NavbarBrand style="color: {color}; "
            >Nota Bene</NavbarBrand
        >
        <div>
            {#if !$is_authorized}
                <Link class='btn' to="login" style="background-color: {color}; text-decoration: none; color: white">Login</Link>
                <Link class='btn' to="register" style="background-color: {color}; text-decoration: none; color: white">Register</Link>
            {:else}
                <h4 class="d-inline p-2">Hello, {$user_name}</h4>
                <Button style="background-color: {color};" on:click={handleAuth}
                    >Logout</Button
                >
            {/if}
        </div>
    </Navbar>
</Router>