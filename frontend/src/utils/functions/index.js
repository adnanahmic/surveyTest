// Common functions
// Cookies
export const setCookie = (name, value, expiry) => {
    const date = new Date();
    date.setTime(date.getTime() + (expiry * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
    return;
}

export const getCookie = (cookie) => {
    return ('; ' + document.cookie).split(`${cookie}=`).pop().split(';').shift();
}

export const deleteCookie = (cookie) => {
    document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}