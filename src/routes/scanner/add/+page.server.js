import { db, isbnDb } from "$lib/server/db";
import { fail, redirect } from "@sveltejs/kit";

export const load = ({ cookies }) => {
    const id = cookies.get('ID');

	if(id == undefined) redirect(303, '/login');
}

/**
 * @type {import("@sveltejs/kit").Actions}
 */
export const actions = {
    default: async ({ request }) => {
        // TODO log the user in
        const data = await request.formData();
        const isbn = data.get("isbn");

        if(!isbn) {
            return fail(400, { missing: true });
        }

        if(isbn?.length != 13) {
            return fail(400, { invalidFormat: true });
        }

        const bookData = isbnDb.prepare("SELECT * FROM books WHERE isbn = ?").get(isbn);
        delete 'url' in bookData;

        const res = await fetch(`https://bookcover.longitood.com/bookcover/${isbn}`);
        const coverURL = (await res.json()).url;

        const params = new URLSearchParams(bookData);
        params.set('cover', coverURL);
        
        redirect(303, '/book/add?' + params.toString());

        return { success: true };
    }
};