import { db } from '$lib/server/db.js';
import { redirect } from '@sveltejs/kit';

export const load = ({ cookies }) => {
    const id = cookies.get('ID');

    if(id != undefined) redirect(303, '/');
}

/**
 * @type {import("@sveltejs/kit").Actions}
 */
export const actions = {
	default: async ({ cookies, request }) => {
		// TODO log the user in
        const data = await request.formData();
		const id = parseInt(data.get("id"));

		if(!id) {
			return fail(400, { missingId: true });
		}
        
		try {
			const studentData = db.prepare("SELECT * FROM students WHERE card_id = ?").get(id);

			if(!studentData) {
				return fail(400, { userNotFound: true });
			}
	
			cookies.set("FIRSTNAME", studentData.firstname, { path: "/", expires: new Date(2026, 9) });
			cookies.set("LASTNAME", studentData.lastname, { path: "/", expires: new Date(2026, 9) });
			cookies.set("ID", studentData.card_id, { path: "/", expires: new Date(2026, 9) });
		} catch(error) {
			console.error(error);
		}
	}
};