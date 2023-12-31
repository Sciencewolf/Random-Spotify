import {useEffect, useState} from "react";
import '../style/Skeleton.css'
import getPlaylistIDs from "./PlaylistIDs.ts";
import Error from "../frontend/Error.tsx";
import isMobileVersion from "./isMobileVersion.ts";
import UpdateDesktop from "./UpdateDesktop.tsx";
import UpdateMobile from "./UpdateMobile.tsx";
import SetBackgroundColor from "../frontend/SetBackgroundColor.tsx";

function LoadComponents(): JSX.Element {
    const [userIcon, setUserIcon] = useState("")
    const [userName, setUserName] = useState("")

    const [songImg, setSongImg] = useState("")
    const [songName, setSongName] = useState("")
    const [songArtist, setSongArtist] = useState("")
    const [songUri, setSongUri] = useState(['spotify:track:7KmbiagSkUbepU88x7NWjb'])

    const [playlistName, setPlaylistName] = useState("")
    const [playlistImg, setPlaylistImg] = useState("")

    const [followersArtist, setFollowersArtist] = useState("")
    const [followersPlaylist, setFollowersPlaylist] = useState("")
    const [artistImg, setArtistImg] = useState("")

    const [checkError, setCheckError] = useState(false)

    const [token, setToken] = useState("")

    const [title, setTitle] = useState("")

    const body = document.querySelector('body')!
    body.id = 'body-after'

    function getToken() {
        const getTokenAfterLogin: string = window.location.href
            .split("#")[1]
            .split("&")[0]
            .split('=')[1];
        console.log(token, songUri) //


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

            const firstTrack = getJson.tracks.items[1];
            await aboutArtist(firstTrack.track.artists[0].id)

            setSongName(firstTrack.track.name);
            setSongArtist(firstTrack.track.artists[0].name)
            setTitle(firstTrack.track.artists[0].name + ' - ' + firstTrack.track.name)
            setSongImg(firstTrack.track.album.images[1].url);
            setSongUri((oldState) => [...oldState, firstTrack.track.uri])
            setPlaylistName(getJson.name)
            setPlaylistImg(getJson.images[0].url)

            // TODO: refactor into slicing, maybe it would be better
            let follows: string = ''
            const total: number = +getJson.followers.total

            if(total >= 1_000_000) {
                follows = String((total / 1_000_000)
                    .toPrecision(2))
                    .replace('.', ',') + 'M'
            }

            setFollowersPlaylist(follows)
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

            let follows: string = ''
            const total: number = +getJson.followers.total

            if(total < 100_000) {
                follows = String((total / 1_000)
                    .toPrecision(2))
                    .replace('.', ',') + 'K'
            }
            else if(total < 1_000_000) {
                follows = String((total / 1_000)
                    .toPrecision(3)
                    .replace('.', ',')) + 'K'
            }
            else {
                follows = String((total / 1_000_000)
                    .toPrecision(3))
                    .replace('.', ',') + 'M'
            }
            setFollowersArtist(follows)

        } catch (err) {
            setCheckError(true)
        }
    }

    function fetchData() {
        getToken()
        userInfo().catch(err => console.log(err))
        playlist().catch(err => console.log(err))
    }

    useEffect(() => {
        fetchData()
        setToken(`${window.localStorage.getItem('token')}`)

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
                                       songUri={songUri}

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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
export default LoadComponents