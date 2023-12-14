import {useEffect, useState} from "react";
import '../style/Skeleton.css'
import UpdateLoginButton from "../frontend/UpdateLoginButton.tsx";

function API(): JSX.Element {
    const [userIcon, setUserIcon] = useState("")
    const [userName, setUserName] = useState("")

    const fetchData = async() => {
        const getTokenAfterLogin: string = window.location.href.split("#")[1].split("&")[0].split('=')[1];
        window.localStorage.setItem("token", getTokenAfterLogin)
        // window.location.hash = ""

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

    }

    useEffect(() => {
        fetchData().catch(err => console.log(err))
    }, [1]);

    return (
        <>
            <UpdateLoginButton userIcon={userIcon} userName={userName} />
        </>
    )
}

export default API;