<script>
    import Task from "../Task/Task.svelte";
    import { x_access_token, x_refresh_token } from "../../stores.js";
    let tasks = [];

    const getTasks = async () => {
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
                tasks = data.tasks;
                console.log(tasks);
                return tasks;
            });
    };

    getTasks();

    let showModal = false;
</script>

<!-- <button on:click={() => (showModal = true)}>Show Modal</button>
    {#if showModal}
        <div class="box" use:clickOutside on:outclick={() => (showModal = false)}>
            Click outside me!
        </div>
    {/if} -->

<div class="list-group">
    {#each tasks as task}
        <button
            type="button"
            class="list-group-item list-group-item-action row"
        >
            <div class="mr-3 d-inline">
                <input
                    type="checkbox"
                    bind:checked={task.is_complete}
                />
            </div>
            <div class='d-inline'>
                <b>{task.label}</b>
            </div>

            {#if task.datetime_expire}
                <div class='ml-auto d-inline'><em class="">Expire at: {task.datetime_expire}</em></div>
            {:else if task.date_expire}
                <div class='ml-auto d-inline'><em>Expire at: {task.date_expire}</em></div>
            {/if}
        </button>
        <Task {...task} />
    {/each}
</div>
