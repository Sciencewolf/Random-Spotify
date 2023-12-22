import {useEffect, useState} from "react";
import '../style/Skeleton.css'
import getPlaylistIDs from "./PlaylistIDs.ts";
import Error from "../frontend/Error.tsx";
import isMobileVersion from "./isMobileVersion.ts";
import UpdateDesktop from "./UpdateDesktop.tsx";
import UpdateMobile from "./UpdateMobile.tsx";
import SetBackgroundColor from "./SetBackgroundColor.tsx";

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

        if (window.localStorage.getItem("token") === undefined || window.localStorage.getItem('token') === null) {
            window.localStorage.setItem("token", getTokenAfterLogin)
            window.location.hash = ''
        } else {
            if (isMobileVersion()) {
                window.localStorage.setItem("token", getTokenAfterLogin) // added for iOS Safari version
            }
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

            if (!response.ok) {
                setCheckError(true)
                return;
            }

            const getJson = await response.json()
            setUserName(getJson.display_name)
            setUserIcon(getJson.images[0].url)
        } catch (err) {
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
                setCheckError(true)
                return;
            }

            const getJson = await response.json();

            const firstTrack = getJson.tracks.items[0];
            await aboutArtist(firstTrack.track.artists[0].id)

            setSongName(firstTrack.track.name);
            setSongArtist(firstTrack.track.artists[0].name)
            setTitle(firstTrack.track.artists[0].name + ' - ' + firstTrack.track.name)
            setSongImg(firstTrack.track.album.images[1].url);
            setPlaylistName(getJson.name)
            setPlaylistImg(getJson.images[0].url)
            setFollowersPlaylist(getJson.followers.total)
        } catch (err) {
            setCheckError(true)
        }
    }

    async function aboutArtist(id: string) {
        try {
            const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`
                }
            })

            if (!response.ok) {
                setCheckError(true)
                return;
            }

            const getJson = await response.json()

            setArtistImg(getJson.images[1].url)
            setFollowersArtist(getJson.followers.total)

        } catch (err) {
            setCheckError(true)
        }
    }

    async function player() {
        try {
            // const response = await fetch(`https://api.spotify.com/v1/me/player`, {
            //     headers: {
            //         Authorization: `Bearer ${window.localStorage.getItem("token")}`
            //     }
            // })
            //
            // if(!response.ok) {
            //     setCheckError(true)
            //     return
            // }
            //
            // const data = await response.json()
            console.log(1)
        } catch (err) {
            setCheckError(true)
        }
    }

    const fetchData = async () => {
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
                    <Error description={"Refresh the page"}
                           errorCode={404}/>
                </>
            ) : (
                !isMobileVersion() ? (
                    <>
                        <UpdateDesktop userIcon={userIcon}
                                       userName={userName}

                                       artistName={songArtist}
                                       artistImg={artistImg}
                                       followersArtist={followersArtist}

                                       songImg={songImg}
                                       songName={songName}
                                       songArtist={songArtist}

                                       playlistImg={playlistImg}
                                       playlistName={playlistName}
                                       followersPlaylist={followersPlaylist}

                                       title={title}
                        />
                        <SetBackgroundColor link={songImg}/>
                    </>

                ) : (
                    <>
                        <UpdateMobile userIcon={userIcon}
                                      userName={userName}

                                      songImg={songImg}
                                      songName={songName}
                                      songArtist={songArtist}

                                      artistName={songArtist}
                                      artistImg={artistImg}
                                      followersArtist={followersArtist}

                                      playlistName={playlistName}
                                      playlistImg={playlistImg}
                                      followersPlaylist={followersPlaylist}
                        />
                        <SetBackgroundColor link={songImg}/>
                    </>
                )
            )}
        </>
    )
}

export default Main;