import { db } from '$lib/server/db.js';
import { fail, redirect } from '@sveltejs/kit';

export function load({ params, cookies }) {
    const studentId = cookies.get("ID");
    if(!studentId) redirect(303, '/login');

    const isbn = params.isbn;
    const bookData = db.prepare("SELECT * FROM books WHERE isbn = ?").get(isbn);

    const { quantity } = db.prepare("SELECT quantity FROM books WHERE isbn = ?").get(isbn) ?? { };
    const currentBorrowers = db.prepare("SELECT firstname, lastname FROM borrow LEFT JOIN students ON student_id=card_id WHERE book_isbn = ? AND end_date IS NULL").all(isbn);
    const { currentBorrowByUserCount } = db.prepare("SELECT COUNT(*) AS currentBorrowByUserCount FROM borrow WHERE book_isbn = ? AND end_date IS NULL AND student_id = ?").get(isbn, studentId);

    return { book: bookData, currentBorrowers, borrowed: currentBorrowByUserCount > 0 };
}

export const actions = {
    async borrow( { request, cookies }) {
        const studentId = cookies.get("ID");

        if(!studentId) return fail(400, { notLoggedIn: true });

        const data = await request.formData();

        const isbn = data.get("isbn");
        
        if(!isbn || isNaN(parseInt(isbn)) || isbn.length != 13) return fail(400, { invalidFormat: true });

        const { quantity } = db.prepare("SELECT quantity FROM books WHERE isbn = ?").get(isbn) ?? { };

        if(!quantity) return fail(40, { bookDoesNotExist: true });

        const { currentBorrowCount } = db.prepare("SELECT COUNT(*) AS currentBorrowCount FROM borrow WHERE book_isbn = ? AND end_date IS NULL").get(isbn);

        const availableCount = quantity - currentBorrowCount;

        if(availableCount <= 0) return fail(400, { notAvailable: true });

        const { currentBorrowByUserCount } = db.prepare("SELECT COUNT(*) AS currentBorrowByUserCount FROM borrow WHERE book_isbn = ? AND end_date IS NULL AND student_id = ?").get(isbn, studentId);

        if(currentBorrowByUserCount != 0) return fail(400, { youAlreadyBorrowed: true });

        try {
            const { changes } = db.prepare("INSERT INTO borrow VALUES (NULL, ?, ?, ?, NULL)").run(studentId, isbn, Date.now());

            if(changes != 1) return { success: false };

            redirect(303, "/");
        } catch(error) {
            console.error(error);
            return { success: false };
        }
    },
    async unborrow( { request, cookies } ) {
        const studentId = cookies.get("ID");

        if(!studentId) fail(400, { notLoggedIn: true });

        const data = await request.formData();

        const isbn = data.get("isbn");
        
        if(!isbn || isNaN(parseInt(isbn)) || isbn.length != 13) return fail(400, { invalidFormat: true });

        const borrowEntry = db.prepare("SELECT * FROM borrow WHERE book_isbn = ? AND end_date IS NULL and student_id = ?").get(isbn, studentId);

        if(!borrowEntry) return fail(400, { notEvenBorrowed: true });

        try {
            const { changes } = db.prepare("UPDATE borrow SET end_date = ? WHERE id = ?").run(Date.now(), borrowEntry.id);

            if(changes != 1) return { success: false };

            return { success: true };
        } catch(error) {
            console.error(error);
            return { success: false };
        }
    }
}