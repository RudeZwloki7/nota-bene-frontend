<script>
    export let uid,
        label = "",
        content = "",
        date_expire = "",
        datetime_expire = "",
        is_complete = false;

    export let user_uid = "";
</script>

<div class="modal fade" id={uid}>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <form class="w-50">
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

                <input type="radio" aria-label="Done" />
            </form>
        </div>
    </div>
</div>
