import { db, isbnDb } from "$lib/server/db";
import { fail, redirect } from "@sveltejs/kit";

export function load({ url }) {
    const params = url.searchParams;
    const isbn = params.get("isbn");
    
    if(isNaN(parseInt(isbn)) || isbn.length != 13) return { };
    else return { values: Object.fromEntries(params.entries())};
}

/**
 * @type {import("@sveltejs/kit").Actions}
 */
export const actions = {
    default: async ({ request }) => {
        // TODO log the user in
        const data = await request.formData();
        const values = Object.fromEntries(data.entries());

        if(!values.isbn) {
            return fail(400, { missingIsbn: true });
        }

        if(!values.title || values.title.length == 0) {
            return fail(400, { missingTitle: true });
        }

        if(values.isbn?.length != 13 || isNaN(parseInt(values.isbn))) {
            return fail(400, { invalidFormat: true });
        }

        // let's check if the book is already in the database, as it may be a mistake from the user if he wants to add it
        const qty = db.prepare("SELECT quantity FROM books WHERE isbn = ?").get(values.isbn);

        // if the book is not in the database, we can just add it
        if(!qty) {
            const stmt = db.prepare("INSERT INTO books VALUES (?, ?, ?, ?, ?, ?, ?)");
            try {
                const pagesNumber = (parseInt(values.pages));
                stmt.run(parseInt(values.isbn), values.title, values.editor, values.format, isNaN(pagesNumber) ? undefined : pagesNumber, values.cover, 1);
            } catch(error) {
                console.error(error);
                return { success: false };
            }
            redirect(303, '/');
        } else { // otherwise, we have to update the quantity : let's redirect the user to a confirmation page
            const params = new URLSearchParams();
            params.set('isbn', values.isbn);
            redirect(303, '/book/add/confirm?' + params.toString());
        }
    }
};

/*
CREATE TABLE books (
isbn INTEGER PRIMARY KEY,
title TEXT NOT NULL,
editor TEXT,
format TEXT,
pages INTEGER,
cover_url TEXT
quantity INTEGER NOT NULL);
*/