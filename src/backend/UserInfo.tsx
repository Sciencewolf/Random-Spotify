import {useState} from "react";
import UpdateLoginButton from "../frontend/UpdateLoginButton.tsx";

async function userInfo() {
    const [userIcon, setUserIcon] = useState("")
    const [userName, setUserName] = useState("")

    try {
        const response = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`
            }
        })

        if(!response.ok) {
            console.log("Error: "  + response.status)
        }

        const getJson = await response.json()
        setUserName(getJson['display_name'])
        setUserIcon(getJson['images'][0]['url'])
    }catch (err) {
        console.log(err)
    }
    return (
        <>
            <UpdateLoginButton userIcon={userIcon} userName={userName} />
        </>
    )
}

export default userInfo