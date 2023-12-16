import {useEffect, useState} from "react";
import '../style/Skeleton.css'
import UpdateLoginButton from "../frontend/UpdateLoginButton.tsx";
import UpdateSkeleton from "../frontend/UpdateSkeleton.tsx";
import UpdateTitle from "../frontend/UpdateTitle.tsx";
import ShowPlaylistOfSong from "../frontend/ShowPlaylistOfSong.tsx";

function Main(): JSX.Element {
    const [userIcon, setUserIcon] = useState("")
    const [userName, setUserName] = useState("")
    const [songImg, setSongImg] = useState("")
    const [songName, setSongName] = useState("")
    const [songArtist, setSongArtist] = useState("")
    const [playlistName, setPlaylistName] = useState("")
    const [playlistImg, setPlaylistImg] = useState("")
    const [title, setTitle] = useState("")

    const userInfo = async() => {
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

    const playlist = async () => {
        try {
            const response = await fetch('https://api.spotify.com/v1/playlists/37i9dQZF1DWWY64wDtewQt', {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`
                }
            })

            if (!response.ok) {
                console.log("Error: " + response.status);
                return;
            }

            const getJson = await response.json();

            const firstTrack = getJson['tracks']['items'][0];
            setSongName(firstTrack['track']['name']);
            setSongArtist(firstTrack['track']['artists'][0]['name'])
            setTitle(firstTrack['track']['artists'][0]['name'] + ' - ' + firstTrack['track']['name'])
            setSongImg(firstTrack['track']['album']['images'][1]['url']);
            setPlaylistName(getJson['name'])
            setPlaylistImg(getJson['images'][0]['url'])

        } catch (err) {
            console.log(err);
        }
    };

    const fetchData = async() => {
        const getTokenAfterLogin: string = window.location.href
            .split("#")[1]
            .split("&")[0]
            .split('=')[1];
        window.localStorage.setItem("token", getTokenAfterLogin)
        userInfo().catch(err => console.log(err))
        playlist().catch(err => console.log(err))
    }

    useEffect(() => {
        fetchData().catch(err => console.log(err))
    }, []);

    return (
        <>
            <UpdateLoginButton userIcon={userIcon}
                               userName={userName} />
            <UpdateSkeleton songImg={songImg}
                            songName={songName}
                            songArtist={songArtist} />
            <UpdateTitle _title={title} />
            <ShowPlaylistOfSong playlistImg={playlistImg}
                                playlistName={playlistName}/>
        </>
    )
}

export default Main;