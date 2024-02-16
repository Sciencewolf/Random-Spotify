import {isMobileVersion} from "./isMobileVersion.ts";

function getToken() {
    const getTokenAfterLogin: string = window.location.href
        .split("#")[1]
        .split("&")[0]
        .split('=')[1];

    if (window.localStorage.getItem("token") === undefined || window.localStorage.getItem('token') === null) {
        window.localStorage.setItem("token", getTokenAfterLogin)
        window.location.hash = ''
    } else {
        if (isMobileVersion()) {
            window.localStorage.setItem("token", getTokenAfterLogin) // added for iOS Safari version
        }
        window.location.hash = ''
    }

    return <></>
}

export default getToken