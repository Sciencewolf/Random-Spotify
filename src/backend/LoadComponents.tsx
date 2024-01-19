import {useEffect, useState} from "react";
import '../style/Skeleton.css'
// import getPlaylistIDs from "./PlaylistIDs.ts";
import Error from "../frontend/Error.tsx";
import UpdateLoginButton from "../frontend/UpdateLoginButton.tsx";

function LoadComponents(): JSX.Element {
    const [userIcon, setUserIcon] = useState("")
    const [userName, setUserName] = useState("")

    // const [songUri, setSongUri] = useState(['spotify:track:7KmbiagSkUbepU88x7NWjb'])

    const [device, setDevice] = useState('')

    const [checkError, setCheckError] = useState(false)
    const [logError, setLogError] = useState('')

    const body = document.querySelector('body')!
    body.id = 'body-after'

    // TODO: load only static components,
    //  transferring and playing is in LoadSpotify... component
    useEffect(() => {
        const loadData = async() => {
            try {
                await Promise.all([
                    userInfo(),
                    // playlist(),
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

    // async function playlist() {
    //     const [...playlistIDs] = getPlaylistIDs()
    //     const randomID: number = Math.floor(Math.random() * playlistIDs.length)
    //     try {
    //
    //
    //         const firstTrack = getJson.tracks.items[1];
    //         await aboutArtist(firstTrack.track.artists[0].id)
    //
    //         setSongUri((oldState) => [...oldState, firstTrack.track.uri])
    //
    //         // TODO: refactor into slicing, maybe it would be better
    //         let follows: string = ''
    //         const total: number = +getJson.followers.total
    //
    //         if(total >= 1_000_000) {
    //             follows = String((total / 1_000_000)
    //                 .toPrecision(2))
    //                 .replace('.', ',') + 'M'
    //
    //             console.log(follows)
    //         }
    //     } catch (err) {
    //         setCheckError(true)
    //         setLogError((oldState) => oldState + 'error at 121')
    //     }
    // }

    async function getDeviceID() {
        const response = await fetch('https://api.spotify.com/v1/me/player/devices', {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`
            }
        })

        if(!response.ok) {
            console.log('error', response.status)
            return
        }

        const data = await response.json()
        console.log(data)

        // TODO: handle multiple devices but now just handle one device
        if(data.devices.length > 1) {

            console.log('>1')
            for (const dev in data.devices){
                console.log(data.devices[dev].name, data.devices[dev].id)
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
                                       userName={userName} />
                </>
            )}
        </>
    )
}

export default LoadComponents