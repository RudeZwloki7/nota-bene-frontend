<script>
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
        }).then((response) => {
            console.log(response);
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
