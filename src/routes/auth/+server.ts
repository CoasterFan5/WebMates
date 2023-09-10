import { db } from '$lib/resources/db';
import { redirect } from '@sveltejs/kit';
import { zerotouch } from '$env/static/private';

export let GET = async () => {
	return Response.redirect(zerotouch, 303);
};
