export default function authHeader() {
    const strToken=localStorage.getItem('token');
    if (Boolean(strToken)){
        const token = JSON.parse(strToken);
        return new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json;charset=utf-8',
        })  // for asp.net core back-end
        /* return { 'x-access-token': user.accessToken };*/       // for Node.js Express back-end
     } else {
        return {};
    }
}
