<script>
    import { useNavigate } from "svelte-navigator";
    import {
        x_access_token,
        x_refresh_token,
        is_authorized,
        user_name,
        API_URL,
    } from "../../stores";

    let name = "",
        email = "",
        password = "",
        password_submit = "";

    let valid = false;

    const navigate = useNavigate();

    const submit = async () => {
        await fetch(`${$API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    response.json().then((data) => {
                        alert(data.msg);
                    });
                }
            })
            .then(() => {
                navigate("/login", { replace: true });
            })
            .catch((error) => {
                error.json().then((err) => {
                    console.log(err.msg);
                });
            });
    };

    const confirm = async () => {
        if (name != "" && email != "" && password != "") {
            if (password === password_submit) {
                valid = true;
            }
        }
    };
</script>

<div class="d-flex justify-content-center mt-5">
    <form class="w-50" on:submit|preventDefault={submit}>
        <h1 class="h3 mb-3 fw-normal text-center">Register</h1>

        <input
            bind:value={name}
            type="text"
            class="form-control mt-3 mb-3"
            placeholder="Your name"
            required
        />

        <input
            bind:value={email}
            type="email"
            class="form-control mb-3"
            placeholder="Email"
            required
        />

        <input
            bind:value={password}
            type="password"
            class="form-control mb-3"
            placeholder="Password"
            required
        />

        <input
            on:change={confirm}
            bind:value={password_submit}
            type="password"
            class="form-control mb-5"
            placeholder="Confirm password"
            required
        />

        {#if valid}
            <button class="w-100 btn btn-lg btn-primary" type="submit">
                Sign up
            </button>
        {:else}
            <button class="w-100 btn btn-lg btn-primary" type="submit" disabled>
                Sign up
            </button>
        {/if}
    </form>
</div>
