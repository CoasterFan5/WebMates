import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';
import { db } from '$lib/resources/db';
import type { RowDataPacket } from 'mysql2';

type User = {
	id: string;
	username: string;
};

export const GET: RequestHandler = async ({ url, cookies }) => {
	
	let [dbdata] = await db.query(`SELECT * FROM users WHERE id = (SELECT userid FROM sessions WHERE session = ${db.escape(cookies.get('session'))})`) as Array<RowDataPacket>;
	let user: User = dbdata[0] as User;
	
	throw redirect(303, `/app/${user.username}`)
	


	return new Response('app');
};
