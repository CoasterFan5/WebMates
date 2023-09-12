import type { PageServerLoad } from "./$types";
import { db } from "$lib/resources/db";
import type { RowDataPacket } from "mysql2";
import { redirect } from "@sveltejs/kit";
import { r2url } from "$env/static/private";
import { r2token } from "$env/static/private";
import crypto from "crypto";

export let load: PageServerLoad = async ({params, cookies}) => {
	let username = params.user;
	let userid = '';
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
		userid = dbdata1[0].id;
	}

	let dbdata;

		//get all the projects
	dbdata = await db.query(`SELECT * FROM projects WHERE owner = ${db.escape(userid)}`) as Array<RowDataPacket>;
	let realDbData = dbdata[0] as Array<any>;
	console.log(realDbData)

	type project = {
		name: string,
		id: string
	}

	let projectArray: Array<project> = [];
	realDbData.forEach((project) => {
		if(project.public || owner) {
			projectArray.push({
				name: project.name,
				id: project.id
			})
		}
	})
	
	


	//get some data from the database

	let [dbdata2] = await db.query(`SELECT * FROM users WHERE username = ${db.escape(params.user)}`) as Array<RowDataPacket>;
	if(dbdata2.length === 0) {
		throw redirect(303, '/app');
	}


	return {
		username: params.user,
		owner: owner,
		projects: projectArray,
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
		let userName = dbdata1[0].username;

		let projectName = `${userName}-${crypto.randomBytes(8).toString('hex')}`
		
		let indexFile = crypto.randomBytes(32).toString('hex');
		console.log(indexFile);
		let jsFile = crypto.randomBytes(32).toString('hex');
		console.log(jsFile);
		let cssFile = crypto.randomBytes(32).toString('hex');
		console.log(cssFile);

		let fileStructure = [
			{
				name: "index.html",
				type: "file",
				path: ""
			},
			{
				name: "index.js",
				type: "file",
				path: ""
			},
			{
				name: "index.css",
				type: "file",
				path: ""
			}
		]

		//create 3 files in r2 
		await fetch(r2url + "/" + indexFile, {
			method: 'POST',
			headers: {
				'Authorization': r2token,
			},
			body: JSON.stringify({
				data: "<h1>Hello World</h1>"
			})
		})


		//create a project in the database
		await db.query(`INSERT INTO projects (id, name, owner, public, structure) VALUES (${db.escape(crypto.randomBytes(32).toString('hex'))}, ${db.escape(projectName)}, ${db.escape(userid)}, true, '${JSON.stringify(fileStructure)}')`);


	}
}