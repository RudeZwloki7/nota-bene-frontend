<script>
	import "./App.css";
	import "bootstrap/dist/css/bootstrap.min.css";
	import Header from "../Header/Header.svelte";
	import { Router, Route, Link } from "svelte-navigator";
	import Login from "../Login/Login.svelte";
	import Register from "../Register/Register.svelte";
	import TaskList from "../TaskList/TaskList.svelte"

	// function handleLogout() {
	//   $user = null;
	// }
</script>

<Header />

<Router basepath="/">
	<Route path="login" component={Login} />
	<Route path="register" component={Register} />

	<Route path="home">
		<!-- {#if } -->
		<h1>Home page</h1>
		<TaskList />
	</Route>
</Router>
