<script>
    import Task from "../Task/Task.svelte";
    import { getContext, onMount } from "svelte";
    import { x_access_token, x_refresh_token } from "../../stores.js";
    import { afterUpdate } from "svelte";

    $: tasks = [];

    $: getTasks = async () => {
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

    const deleteTask = async (taskId) => {
        await fetch(`http://localhost:5000/task/${taskId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "x-refresh-token": $x_refresh_token,
                "x-access-token": $x_access_token,
            },
        });

        tasks = tasks.splice();
    };

    const { open } = getContext("simple-modal");
    const showTask = (t) => open(Task, { ...t });

    let selectedTask;

    $:handleUpdate = async (task) => {
        task.is_complete = !task.is_complete
        console.log(tasks)

        await fetch(`http://localhost:5000/task/${task.uid}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-refresh-token": $x_refresh_token,
                "x-access-token": $x_access_token,
            },
            body: JSON.stringify({
                ...task,
            }),
        });
        tasks = tasks
    };

    onMount(async () => {
        getTasks();
    });

</script>

<svelte:head>
    <script
        src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"></script>
</svelte:head>

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
                    <input
                        type="checkbox"
                        checked={false}
                        on:click={handleUpdate(task)}
                    />
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
                <button class="mr-3 d-inline" on:click={deleteTask(task.uid)}>
                    ❌
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
                    <input
                        type="checkbox"
                        checked={true}
                        on:click={handleUpdate(task)}
                    />
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

                <button class="mr-3 d-inline" on:click={deleteTask(task.uid)}>
                    ❌
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
