const IS_LOGIN_USER="IS_LOGIN_USER";

export function facebooklogin(data)
{
    return function(dispatch){
        dispatch({type:IS_LOGIN_USER,IS_LOGGED_IN:data.isLoggedIn,username:data.username});
    }
}