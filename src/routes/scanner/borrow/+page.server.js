import { db } from '$lib/server/db.js';
import { redirect } from '@sveltejs/kit';

export const load = ({ cookies }) => {
    const id = cookies.get('ID');

    if(id == undefined) redirect(303, '/login');
}

export const actions = {
    async default( { request, cookies }) {
        const studentId = cookies.get("ID");

        if(!studentId) return fail(400, { notLoggedIn: true });

        const data = await request.formData();

        const isbn = data.get("isbn");
        
        if(!isbn || isNaN(parseInt(isbn)) || isbn.length != 13) return fail(400, { invalidFormat: true });

        const { quantity } = db.prepare("SELECT quantity FROM books WHERE isbn = ?").get(isbn) ?? { };

        if(!quantity) return fail(40, { bookDoesNotExist: true });
        
        const { currentBorrowByUserCount } = db.prepare("SELECT COUNT(*) AS currentBorrowByUserCount FROM borrow WHERE book_isbn = ? AND end_date IS NULL AND student_id = ?").get(isbn, studentId);

        if(currentBorrowByUserCount != 0) return redirect(303, `/book/${isbn}`);

        const { currentBorrowCount } = db.prepare("SELECT COUNT(*) AS currentBorrowCount FROM borrow WHERE book_isbn = ? AND end_date IS NULL").get(isbn);

        const availableCount = quantity - currentBorrowCount;

        if(availableCount <= 0) return fail(400, { notAvailable: true });

        try {
            const { changes } = db.prepare("INSERT INTO borrow VALUES (NULL, ?, ?, ?, NULL)").run(studentId, isbn, Date.now());

            if(changes != 1) return { success: false };
        } catch(error) {
            console.error(error);
            return { success: false };
        }

        return redirect(303, "/book/" + isbn);
    }
}