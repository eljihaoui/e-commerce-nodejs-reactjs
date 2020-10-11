export const isAuthenticated = () => {
    const jwt = localStorage.getItem('jwt_info');
    if (jwt) {
        return JSON.parse(jwt)
    }
    return false;
}
export const isAdmin=()=>{
    if(isAuthenticated() )  return (isAuthenticated().user.role===1 ? true:false)
    return false;
}