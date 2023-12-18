import {useEffect, useState} from "react";
import '../style/Skeleton.css'
import UpdateLoginButton from "../frontend/UpdateLoginButton.tsx";
import UpdateSkeleton from "../frontend/UpdateSkeleton.tsx";
import UpdateTitle from "../frontend/UpdateTitle.tsx";
import ShowPlaylistOfSong from "../frontend/ShowPlaylistOfSong.tsx";
import getPlaylistIDs from "./PlaylistIDs.ts";
import AboutTheArtist from "../frontend/AboutTheArtist.tsx";

function Main(): JSX.Element {
    const [userIcon, setUserIcon] = useState("")
    const [userName, setUserName] = useState("")
    const [songImg, setSongImg] = useState("")
    const [songName, setSongName] = useState("")
    const [songArtist, setSongArtist] = useState("")
    const [playlistName, setPlaylistName] = useState("")
    const [playlistImg, setPlaylistImg] = useState("")
    const [description, setDescription] = useState("")
    const [artistImg, setArtistImg] = useState("")
    const [title, setTitle] = useState("")

    const getToken = () => {
        const getTokenAfterLogin: string = window.location.href
            .split("#")[1]
            .split("&")[0]
            .split('=')[1];

        if(window.localStorage.getItem("token") === undefined || window.localStorage.getItem('token') === null) {
            window.localStorage.setItem("token", getTokenAfterLogin)
        }else {
            window.location.hash = ''
        }
    }

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
        const [...playlistIDs] = getPlaylistIDs()
        const randomID = Math.floor(Math.random() * playlistIDs.length)
        try {
            const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistIDs[randomID]}`, {
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
            await aboutArtist(firstTrack['track']['artists'][0]['id'])

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

    const aboutArtist = async(id: string) => {
        try {
            const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`
                }
            })

            const getJson = await response.json()

            setArtistImg(getJson['images'][1]['url'])
            setDescription(getJson['followers']['total'])

        }catch (err) {
            console.log(err)
        }
    }

    const player = async() => {
        try{
            const response = ''
            console.log(response)
        }catch (err) {
            console.log(err)
        }
    }

    const fetchData = async() => {
        getToken()
        userInfo().catch(err => console.log(err))
        playlist().catch(err => console.log(err))
        player().catch(err => console.log(err))
    }

    useEffect(() => {
        fetchData().catch(err => console.log(err))
    }, []);

    const isMobileVersion = () => {
        return /Android|iPhone/.test(window.navigator.userAgent)
    }

    return (
        <>
            {!isMobileVersion() ? (
                <>
                    <UpdateLoginButton userIcon={userIcon}
                                       userName={userName}
                    />
                    <AboutTheArtist artistName={songArtist}
                                    artistImg={artistImg}
                                    description={description + " followers."}
                    />
                    <UpdateSkeleton songImg={songImg}
                                    songName={songName}
                                    songArtist={songArtist}
                    />
                    <ShowPlaylistOfSong playlistImg={playlistImg}
                                        playlistName={playlistName}
                    />
                    <UpdateTitle _title={title}
                    />
                </>
            ) : (
                <></>
            )}
        </>
    )
}

export default Main;