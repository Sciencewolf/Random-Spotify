import {useEffect, useState} from "react";
import '../style/Skeleton.css'
import getCollectionOfPlaylistIDs from "./CollectionOfPlaylistIDs.ts";

function Main(): JSX.Element {
    const [tracks, setTracks] = useState([])

    const playlist = async() => {
        const [...args] = getCollectionOfPlaylistIDs()
        console.log(args)
        try {
            const response = await fetch('https://api.spotify.com/v1/playlists/37i9dQZF1DX18jTM2l2fJY', {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`
                }
            })

            if(!response.ok) {
                console.log("Error: "  + response.status)
            }

            const getJson = await response.json()
            setTracks(getJson['tracks'])
            console.log(getJson)
            console.log(tracks)

        }catch (err) {
            console.log(err)
        }
    }

    const fetchData = async() => {
        const getTokenAfterLogin: string = window.location.href.split("#")[1].split("&")[0].split('=')[1];
        window.localStorage.setItem("token", getTokenAfterLogin)
        // window.location.hash = ""
        playlist().catch(err => console.log(err))

    }

    useEffect(() => {
        fetchData().catch(err => console.log(err))
    }, []);

    return (
        <>

        </>
    )
}

export default Main;