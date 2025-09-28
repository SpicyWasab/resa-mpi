export const load = ({ cookies }) => {
    const id = cookies.get('ID');
    const firstname = cookies.get('FIRSTNAME');
    const lastname = cookies.get('LASTNAME')
    
    return { id, firstname, lastname, loggedIn : (id != undefined) };
}