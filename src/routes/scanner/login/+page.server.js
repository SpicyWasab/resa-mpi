import { db } from "$lib/server/db";
import { fail, redirect } from "@sveltejs/kit";

export const load = ({ cookies }) => {
    const id = cookies.get('ID');

	if(id != undefined) redirect(303, '/');
}