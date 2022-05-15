import { writable } from 'svelte/store';

export const x_access_token = writable('');
export const x_refresh_token = writable('');
export let tasks = writable([]);
export let is_authorized = writable(false);
export let user_name = writable('')
export let API_URL = writable('https://dashboard.heroku.com/apps/notabene-backend')
