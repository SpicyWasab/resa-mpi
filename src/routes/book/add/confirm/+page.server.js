import { db } from '$lib/server/db.js';
import { redirect } from '@sveltejs/kit';

export function load({ url }) {
    const isbn = url.searchParams.get("isbn");
    
    if(!isbn || isbn.length != 13 || isNaN(parseInt(isbn))) redirect(303, '/');

    const { quantity: qty } = db.prepare("SELECT quantity FROM books WHERE isbn = ?").get(isbn) ?? {  };

    if(qty == undefined) redirect(303, '/');

    else return { isbn, qty };
}

export const actions = {
    async default({ request, cookies }) {
        if(!cookies.get("ID")) redirect(303, '/');

        const data = await request.formData();
        const isbn = data.get("isbn");

        if(!isbn || isbn.length != 13 || isNaN(parseInt(isbn))) return redirect(303, '/');

        try {
            const stmt = db.prepare("UPDATE books SET quantity = quantity + 1 WHERE isbn = ?");
            const { changes } = stmt.run(isbn);
            if(changes != 1) return { success: false };
        } catch(error) {
            console.error(error);
            return { success: false }
        }

        return redirect(303, '/');
    }
}