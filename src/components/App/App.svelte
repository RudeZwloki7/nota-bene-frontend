<script>
	import "./App.css";
	import "bootstrap/dist/css/bootstrap.min.css";
	import Header from "../Header/Header.svelte";
	import { Router, Route, Link } from "svelte-navigator";
	import { is_authorized } from "../../stores.js";
	import Login from "../Login/Login.svelte";
	import Register from "../Register/Register.svelte";
	import TaskList from "../TaskList/TaskList.svelte";
	import Modal from "svelte-simple-modal";
	import Welcome from "../Welcome/Welcome.svelte";
</script>

<Router>
	<Header />
	<div class="px-3">
		<Route path="login" component={Login} />
		<Route path="register" component={Register} />
		<Route path="welcome" component={Welcome} />
		<Route path="/" component={Welcome} />

		<Route path="home">
			{#if $is_authorized}
				<h2 class="my-3">Home page</h2>
				<Modal><TaskList /></Modal>
			{:else}
				<Welcome />
			{/if}
		</Route>
	</div>
</Router>
