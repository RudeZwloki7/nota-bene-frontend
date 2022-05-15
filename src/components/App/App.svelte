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
	<Route path="login" component={Login} />
	<Route path="register" component={Register} />
	<Route path="welcome" component={Welcome} />
	<Route path="/" component={Welcome} />

	<Route path="home">
		{#if $is_authorized}
			<h3>Home page</h3>
			<Modal><TaskList /></Modal>
		{:else}
			<Welcome />
		{/if}
	</Route>
</Router>
