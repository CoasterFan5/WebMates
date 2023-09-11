import type { PageServerLoad } from "./$types";
import { db } from "$lib/resources/db";
import type { RowDataPacket } from "mysql2";
import { redirect } from "@sveltejs/kit";


export let load: PageServerLoad = async ({params, cookies}) => {
	let username = params.user;
	let owner = false;

	//check if the user is logged in
	if(cookies.get('session') != undefined) {
		let session = cookies.get('session');
		let [dbdata1] = await db.query(`SELECT * FROM users WHERE id = (select userid from sessions where session = ${db.escape(session)})`) as Array<RowDataPacket>;
		if(dbdata1.length < 1) {
			throw redirect(303, '/auth');
		}
		if(dbdata1[0].username === params.user) {
			owner = true;
		}
	}
	
	


	//get some data from the database

	let [dbdata2] = await db.query(`SELECT * FROM users WHERE username = ${db.escape(params.user)}`) as Array<RowDataPacket>;
	if(dbdata2.length === 0) {
		throw redirect(303, '/app');
	}


	return {
		username: params.user,
		owner: owner,
		projects: [],
	}
};

export const actions = {
	createProject: async ({ cookies, request}) => {
		//get the session and user id 
		let session = cookies.get('session');
		let [dbdata1] = await db.query(`SELECT * FROM users WHERE id = (select userid from sessions where session = ${db.escape(session)})`) as Array<RowDataPacket>;
		if(dbdata1.length < 1) {
			throw redirect(303, '/auth');
		}

		let userid = dbdata1[0].id;
		console.log(userid);
	}
}