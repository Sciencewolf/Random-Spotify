import {useEffect, useState} from "react";
import '../style/Skeleton.css'
import UpdateLoginButton from "../frontend/UpdateLoginButton.tsx";
import UpdateSkeleton from "../frontend/UpdateSkeleton.tsx";
import UpdateTitle from "../frontend/UpdateTitle.tsx";
import ShowPlaylistOfSong from "../frontend/ShowPlaylistOfSong.tsx";
import getPlaylistIDs from "./PlaylistIDs.ts";
import AboutTheArtist from "../frontend/AboutTheArtist.tsx";
import Footer from "../frontend/Footer.tsx";
import Error from "../frontend/Error.tsx";
import isMobileVersion from "./isMobileVersion.ts";

function Main(): JSX.Element {
    const [userIcon, setUserIcon] = useState("")
    const [userName, setUserName] = useState("")

    const [songImg, setSongImg] = useState("")
    const [songName, setSongName] = useState("")
    const [songArtist, setSongArtist] = useState("")

    const [playlistName, setPlaylistName] = useState("")
    const [playlistImg, setPlaylistImg] = useState("")

    const [followersArtist, setFollowersArtist] = useState("")
    const [followersPlaylist, setFollowersPlaylist] = useState("")
    const [artistImg, setArtistImg] = useState("")

    const [checkError, setCheckError] = useState(false)

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

    async function userInfo() {
        try {
            const response = await fetch('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`
                }
            })

            if(!response.ok) {
                alert('error @ 55')
                setCheckError(true)
                return;
            }

            const getJson = await response.json()
            setUserName(getJson['display_name'])
            setUserIcon(getJson['images'][0]['url'])
        }catch (err) {
            alert('error @ 64')
            setCheckError(true)
        }
    }

    async function playlist() {
        const [...playlistIDs] = getPlaylistIDs()
        const randomID = Math.floor(Math.random() * playlistIDs.length)
        try {
            const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistIDs[randomID]}`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`
                }
            })

            if (!response.ok) {
                alert('error @ 80')
                setCheckError(true)
                return;
            }

            const getJson = await response.json();
            console.log(getJson)

            const firstTrack = getJson['tracks']['items'][0];
            await aboutArtist(firstTrack['track']['artists'][0]['id'])

            setSongName(firstTrack['track']['name']);
            setSongArtist(firstTrack['track']['artists'][0]['name'])
            setTitle(firstTrack['track']['artists'][0]['name'] + ' - ' + firstTrack['track']['name'])
            setSongImg(firstTrack['track']['album']['images'][1]['url']);
            setPlaylistName(getJson['name'])
            setPlaylistImg(getJson['images'][0]['url'])
            setFollowersPlaylist(getJson['followers']['total'])
        } catch (err) {
            alert('error @ 99')
            setCheckError(true)
        }
    }

    async function aboutArtist(id: string){
        try {
            const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`
                }
            })

            if(!response.ok) {
                alert('error @ 113')
                setCheckError(true)
                return;
            }

            const getJson = await response.json()

            setArtistImg(getJson['images'][1]['url'])
            setFollowersArtist(getJson['followers']['total'])

        }catch (err) {
            alert('error @ 124')
            setCheckError(true)
        }
    }

    const player = async() => {
        try{
            const response = ''
            console.log(response)
        }catch (err) {
            alert('error @ 134')
            setCheckError(true)
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

    return (
        <>
            {checkError ? (
                <>
                    <Error description={"Error. Refresh the page."}
                           errorCode={404} />
                </>

            ) : (
                !isMobileVersion() ? (
                    <>
                        <UpdateLoginButton userIcon={userIcon}
                                           userName={userName}
                        />
                        <AboutTheArtist artistName={songArtist}
                                        artistImg={artistImg}
                                        followers={followersArtist + " followers"}
                        />
                        <UpdateSkeleton songImg={songImg}
                                        songName={songName}
                                        songArtist={songArtist}
                        />
                        <ShowPlaylistOfSong playlistImg={playlistImg}
                                            playlistName={playlistName}
                                            followers={followersPlaylist}
                        />
                        <Footer/>
                        <UpdateTitle _title={title} />
                    </>
                ) : (
                    <>
                        <UpdateLoginButton userIcon={userIcon}
                                           userName={userName}
                        />
                        <UpdateSkeleton songImg={songImg}
                                        songName={songName}
                                        songArtist={songArtist}
                        />
                        <AboutTheArtist artistName={songArtist}
                                        artistImg={artistImg}
                                        followers={followersArtist + " followers"}
                        />
                    </>
                )
            )}
        </>
    )
}

export default Main;