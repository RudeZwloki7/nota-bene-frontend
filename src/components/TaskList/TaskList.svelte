<script>
    import Task from "../Task/Task.svelte";
    import { getContext } from "svelte";
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
                return tasks;
            });
    };

    getTasks();

    const deleteTask = async (taskId) => {
        await fetch(`http://localhost:5000/task/${taskId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "x-refresh-token": $x_refresh_token,
                "x-access-token": $x_access_token,
            },
        });
    };

    const { open } = getContext("simple-modal");
    const showTask = (t) => open(Task, { ...t });
</script>

<div class="list-group">
    <button
        type="button"
        class="list-group-item list-group-item-action tes"
        on:click={showTask}
        ><p class="font-italic">Create new task...</p></button
    >

    {#each tasks as task}
        {#if !task.is_complete}
        <div class="d-flex flex-row">
            <button class="mr-3 d-inline" disabled>
                <input type="checkbox" bind:checked={task.is_complete} />
            </button>

            <button
                class="list-group-item list-group-item-action"
                class:checked={task.is_complete}
                on:click={showTask(task)}
            >
                <div class="d-inline">
                    <b>{task.label}</b>
                </div>

                {#if task.datetime_expire}
                    <div class="ml-auto d-inline">
                        <em class="">Expire at: {task.datetime_expire}</em>
                    </div>
                {:else if task.date_expire}
                    <div class="ml-auto d-inline">
                        <em>Expire at: {task.date_expire}</em>
                    </div>
                {/if}
            </button>
        </div>
        {/if}
    {/each}
</div>

<h3>Completed tasks</h3>
<div class="list-group">    
    {#each tasks as task}
    {#if task.is_complete}
        <div class="d-flex flex-row">
            <button class="mr-3 d-inline" disabled>
                <input type="checkbox" bind:checked={task.is_complete} />
            </button>

            <button
                class="list-group-item list-group-item-action"
                class:checked={task.is_complete}
                on:click={showTask(task)}
            >
                <div class="d-inline">
                    <b>{task.label}</b>
                </div>

                {#if task.datetime_expire}
                    <div class="ml-auto d-inline">
                        <em class="">Expire at: {task.datetime_expire}</em>
                    </div>
                {:else if task.date_expire}
                    <div class="ml-auto d-inline">
                        <em>Expire at: {task.date_expire}</em>
                    </div>
                {/if}
            </button>
        </div>
        {/if}
    {/each}
</div>

<style>
    .checked {
        text-decoration: line-through;
    }
</style>
