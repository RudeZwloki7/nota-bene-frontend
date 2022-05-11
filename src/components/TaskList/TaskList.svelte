<script>
import { Label } from "sveltestrap";

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
            tasks = data.tasks
            console.log(tasks);
            return tasks;
        });
    };

    getTasks();
</script>

{#each tasks as task}
    <p>{task.label}: {task.content}</p>
{/each}
