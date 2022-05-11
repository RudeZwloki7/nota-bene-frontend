<script>
    let name = "",
        email = "",
        password = "",
        password_submit = "";

    let valid = false;

    const submit = async () => {
        await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        }).then((response) => {
            console.log(response);
        });
    };

    const confirm = async () => {
        if (name != "" && email != "" && password != "") {
            if (password === password_submit) {
                valid = true;
            }
        }
        console.log(valid);
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
