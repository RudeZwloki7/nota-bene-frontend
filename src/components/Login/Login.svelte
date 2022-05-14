<script>
    import { setContext } from "svelte";
    import { x_access_token, x_refresh_token } from "../../stores";
    import { navigate } from "svelte-navigator";

    let email = "",
        password = "";
    const submit = async () => {
        await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                x_refresh_token.set(data["x-refresh-token"]);
                x_access_token.set(data["x-access-token"]);
            })
            .then(() => {
                navigate("home", { replace: true });
            });
    };
</script>

<div class="d-flex justify-content-center mt-5">
    <form class="w-50" on:submit|preventDefault={submit}>
        <h1 class="h3 mb-3 fw-normal text-center">Login</h1>

        <input
            bind:value={email}
            type="email"
            class="form-control mt-3 mb-3"
            placeholder="Email"
            required
        />

        <input
            bind:value={password}
            type="password"
            class="form-control mb-5"
            placeholder="Password"
            required
        />

        <button class="w-100 btn btn-lg btn-primary" type="submit"
            >Sign in</button
        >
    </form>
</div>
