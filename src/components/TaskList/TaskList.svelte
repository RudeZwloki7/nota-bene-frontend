<script>
    import Task from "../Task/Task.svelte";
    import { getContext, onMount } from "svelte";
    import { x_access_token, x_refresh_token, tasks, API_URL } from "../../stores.js";
    import { afterUpdate } from "svelte";

    $tasks;

    $: getTasks = async () => {
        await fetch(`${$API_URL}/tasks`, {
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
    };

    const deleteTask = async (taskId) => {
        await fetch(`${$API_URL}/task/${taskId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "x-refresh-token": $x_refresh_token,
                "x-access-token": $x_access_token,
            },
        });

        for (var i = 0; i < $tasks.length; i++) {
            if ($tasks[i].uid === taskId) {
                var spliced = $tasks.splice(i, 1);
            }
        }
        $tasks = [...$tasks];
    };

    const { open } = getContext("simple-modal");
    const showTask = (t) => open(Task, { ...t });

    $: handleUpdate = async (task) => {
        task.is_complete = !task.is_complete;

        await fetch(`${$API_URL}/task/${task.uid}`, {
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
        $tasks = [...$tasks];
    };

    onMount(async () => {
        getTasks();
    });
</script>

<div class="list-group">
    <button
        type="button"
        class="list-group-item list-group-item-action tes"
        on:click={showTask}
        ><p class="font-italic">Create new task...</p></button
    >

    {#each $tasks as task}
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

                    <div class="ml-auto d-inline">
                        {#if task.date_expire || task.time_expire}
                            <em
                                >Expire at:
                                {#if task.date_expire}
                                    {task.date_expire}
                                {/if}

                                {#if task.time_expire}
                                    {task.time_expire}
                                {/if}
                            </em>
                        {/if}
                    </div>
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
    {#each $tasks as task}
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

                    {#if task.time_expire}
                        <div class="ml-auto d-inline">
                            <em class="">Expire at: {task.time_expire}</em>
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
