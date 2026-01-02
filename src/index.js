/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

const { Hono } = require('hono');

const app = new Hono();

app.get('/', (c) => {
	return c.json({ hello: 'W0rld' });
});

app.get('/about', (c) => {
	return c.json({ about: 'This is a Cloudflare Worker using Hono framework.' });
});

app.get('/greet/:name', (c) => {
	const name = c.req.param('name');
	return c.html(`<h1>Hello, ${name}!</h1>`);
});

app.get('/search', (c) => {
	const { username } = c.req.query();
	if (username) {
		return c.json({ message: `Searching for user: ${username}` });
	} else {
		return c.json({ error: 'Username query parameter is missing.' }, 400);
	}
});

app.all('*', (c) => {
	return c.json({ error: 'Route not found' }, 404);
});

export default app;
