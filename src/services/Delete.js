export default async function Delete(url = '', attachedheaders = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        headers: attachedheaders,
    });
    return response.json(); // parses JSON response into native JavaScript objects
}
