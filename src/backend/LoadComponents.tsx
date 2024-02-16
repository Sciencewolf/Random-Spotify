import {useEffect, useState} from "react";
import '../style/Skeleton.css'
import Error from "../frontend/Error.tsx";
import UpdateLoginButton from "../frontend/UpdateLoginButton.tsx";

function LoadComponents(): JSX.Element {
    const [userIcon, setUserIcon] = useState("")
    const [userName, setUserName] = useState("")

    const [device, setDevice] = useState('')

    const [checkError, setCheckError] = useState(false)
    const [logError, setLogError] = useState('')

    const body = document.querySelector('body')!
    body.id = 'body-after'

    useEffect(() => {
        const loadData = async() => {
            try {
                await Promise.all([
                    userInfo(),
                    getDeviceID(),
                ])
                console.log(logError, device)
            }catch (err) {
                console.log(err)
            }
        }

        loadData().then(res => console.log(res)).then(err => console.log(err))

    }, []);

    async function userInfo() {
        try {
            const response = await fetch('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`
                }
            })

            if (!response.ok) {
                setCheckError(true)
                setLogError((oldState) => oldState + 'error at 65')
                return;
            }

            const getJson = await response.json()

            setUserName(getJson.display_name)
            setUserIcon(getJson.images[0].url)
        } catch (err) {
            setCheckError(true)
            setLogError((oldState) => oldState + 'error at 75')
        }
    }

    async function getDeviceID() {
        const response = await fetch('https://api.spotify.com/v1/me/player/devices', {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`
            }
        })

        if(!response.ok) {
            return
        }

        const data = await response.json()

        if(data.devices.length > 1) {
            for (const dev in data.devices){
                if(data.devices[dev].name.includes('Random Spotify')){
                    setDevice(data.devices[dev].id)
                }
            }
        }else {
            setDevice(data.devices[0].id)
        }
    }

    return (
        <>
            {checkError ? (
                <>
                    <Error description={"Refresh the page"}
                           errorCode={404}/>
                </>
            ) : (
                <>
                    <UpdateLoginButton userIcon={userIcon}
                                       userName={userName}
                    />
                </>
            )}
        </>
    )
}

export default LoadComponents