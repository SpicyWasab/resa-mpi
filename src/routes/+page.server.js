import { db } from '$lib/server/db.js';
import { redirect } from '@sveltejs/kit';

export const load = ({ cookies }) => {
    const studentId = cookies.get('ID');

    if(studentId == undefined) redirect(303, '/login');

    const books = db.prepare("SELECT * FROM books").all();
    const borrows = db.prepare("SELECT * FROM borrow WHERE end_date IS NULL").all();

    return { books: books.map(b => {
        const borrowedAmount = borrows.reduce((acc, bor) => bor.book_isbn == b.isbn ? acc + 1 : acc, 0);
        const available = borrowedAmount < b.quantity;
        const borrowed = borrowedAmount > 0;
        const borrowedByMe = borrows.find(bor => bor.book_isbn == b.isbn && bor.student_id == studentId) != undefined;

        console.log("available", available);

        console.log("borrowed", borrowedAmount);

        return { isbn: b.isbn, title: b.title, cover: b.cover_url, borrowedByMe, available, borrowed }
    }) };
}