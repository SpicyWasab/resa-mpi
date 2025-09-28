import { redirect } from '@sveltejs/kit';

export function load({ cookies }) {
    cookies.delete("ID", { path: '/' });
    cookies.delete("FIRSTNAME", { path: '/' });
    cookies.delete("LASTNAME", { path: '/' });

    redirect(303, '/login');
}