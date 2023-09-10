import type { PageServerLoad } from "./$types";


export let load: PageServerLoad = async ({params}) => {
	console.log(params.user);
};