import type { RequestHandler } from './$types';
import { redirect, error } from '@sveltejs/kit';
import crypto from 'crypto';
import { db } from '$lib/resources/db';
import { secureCookies } from '$env/static/private';



export const GET: RequestHandler = async ({ url, cookies }) => {
	let token = url.searchParams.get('token')

	if (!token) {
		throw redirect(303, '/auth/zerotouch');
	}

	//verify the token
	let req = await fetch('https://coaster.services/zerotouch/exchange?token=' + token)
	let data = await req.json()
	if(!data || !data.user) {
		throw error(403, 'Invalid token');
	}

	console.log(data)

	//create a session
	let session = crypto.randomBytes(32).toString('hex')

	let expires = (Date.now() + (1000 * 60 * 60 * 24 * 30))
	let date = new Date(expires)

	await db.query('INSERT INTO sessions (session, userid, expires) VALUES (?, ?, ?)', [session, data.user, date])

	//set the session cookie

	cookies.set('session', session, {
		expires: date,
		path: '/',
		sameSite: 'strict',
		secure: secureCookies.toLowerCase() === 'true',
	})



	throw redirect(303, "/app")
}