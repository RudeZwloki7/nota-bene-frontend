<script>
    import { useNavigate, Link } from "svelte-navigator";
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
        if (valid) {
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
        }
    };

    const confirm = () => {
        console.log(valid);
        if (password === password_submit) {
            valid = true;
        } else {
            valid = false;
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
            class="form-control"
            class:invalid={!valid}
            placeholder="Confirm password"
            required
        />
        {#if !valid}
            <div class="text-danger">
                <small>Passwords doesn't match</small>
            </div>
        {/if}

        <p class="text-center text-muted mt-3 mb-5 mb-0">
            Have already an account?
            <Link to="/login" class="fw-bold text-body">
                <u>Login here</u>
            </Link>
        </p>

        <button class="w-100 btn btn-lg btn-primary" type="submit">
            Sign up
        </button>
    </form>
</div>

<style>
    .invalid {
        border: 2px solid red;
    }
</style>
