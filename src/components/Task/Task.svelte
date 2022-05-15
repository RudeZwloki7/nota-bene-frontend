<script>
    import { x_access_token, x_refresh_token, tasks } from "../../stores.js";
    import {
        afterUpdate,
        createEventDispatcher,
        getContext,
        onDestroy,
    } from "svelte";
    const { open, close } = getContext("simple-modal");

    export let uid,
        label = "",
        content = "",
        date_expire,
        datetime_expire,
        is_complete = false;

    const createTask = async () => {
        await fetch("http://localhost:5000/create_task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-refresh-token": $x_refresh_token,
                "x-access-token": $x_access_token,
            },
            body: JSON.stringify({
                label,
                content,
                date_expire,
                datetime_expire,
                is_complete,
            }),
        });

        let newTask = {
            label,
            content,
            date_expire,
            datetime_expire,
            is_complete,
        };
        console.log(newTask);

        close();
        await fetch("http://localhost:5000/tasks", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-refresh-token": $x_refresh_token,
                "x-access-token": $x_access_token,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                tasks.set(data.tasks);
            });
        
        console.log($tasks);
    };

    export const updateTask = async () => {
        await fetch(`http://localhost:5000/task/${uid}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-refresh-token": $x_refresh_token,
                "x-access-token": $x_access_token,
            },
            body: JSON.stringify({
                label,
                content,
                date_expire,
                datetime_expire,
                is_complete,
            }),
        });

        close();
        for (var i = 0; i < $tasks.length; i++) {
            if ($tasks[i].uid === uid) {
                $tasks[i] = {
                    uid,
                    label,
                    content,
                    date_expire,
                    datetime_expire,
                    is_complete,
                };
            }
        }
    };
</script>

<form class="w-50">
    <h3>Manage your task</h3>
    <input
        bind:value={label}
        type="text"
        class="form-control mt-3 mb-3"
        placeholder="Write label..."
    />

    <input
        bind:value={content}
        type="text"
        class="form-control mb-3"
        placeholder="Describe your task..."
    />

    <input
        bind:value={date_expire}
        type="date"
        class="form-control mb-3"
        placeholder="Not setted"
    />
    <btn class="btn btn-danger" on:click={close}>Cancel</btn>
    {#if !uid}
        <btn class="btn btn-primary" on:click={createTask}>Create</btn>
    {:else}
        <btn class="btn btn-success" on:click={updateTask}>Update</btn>
    {/if}
</form>
