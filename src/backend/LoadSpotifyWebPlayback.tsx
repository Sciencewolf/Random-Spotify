import UAParser from "ua-parser-js";
import {useEffect, useState} from "react";
import UpdateTitle from "../frontend/UpdateTitle.tsx";
import transferPlayback from "./transferPlayback.ts";
import UpdateDesktop from "./UpdateDesktop.tsx";
import {isMobileVersion} from "./isMobileVersion";
import UpdateMobile from "./UpdateMobile.tsx";

// TODO: implement all functions inside this component
// TODO: update desktop or mobile components
function useLoadSpotifyWebPlayback() {
    const [deviceID, setDeviceID] = useState('')

    const [songImg, setSongImg] = useState('')
    const [songArtist, setSongArtist] = useState('')
    const [songName, setSongName] = useState('')

    const [artistImg, setArtistImg] = useState("")
    const [followersArtist, setFollowersArtist] = useState("")

    const [playlistName, setPlaylistName] = useState("")
    const [playlistImg, setPlaylistImg] = useState("")
    const [followersPlaylist, setFollowersPlaylist] = useState("")

    const [error, setError] = useState(false)
    const [log, setLog] = useState('')

    let base: string | null | Spotify.Track = ''

    useEffect(() => {
        const browser = new UAParser();

        window.onSpotifyWebPlaybackSDKReady = async () => {
            const player = new Spotify.Player({
                getOAuthToken: cb => {
                    cb(`${window.localStorage.getItem('token')}`)
                },
                name: /Android|iPhone/.test(window.navigator.userAgent)
                    ? `Random Spotify (${browser.getBrowser().name}, ${browser.getOS().name})`
                    : `Random Spotify (${browser.getBrowser().name}, ${browser.getOS().name})`,
                volume: 0.5
            })

            player.addListener('ready', ({device_id}) => {
                setLog((oldState) => oldState + device_id)
                setDeviceID(() => device_id)
            })

            player.addListener('not_ready', ({device_id}) => {
                setError(true)
                setLog((oldState) => oldState + device_id)
            })

            player.addListener('player_state_changed', (state) => {
                if (!state) {
                    return;
                }

                player.getCurrentState().then(state => {
                        (!state)
                            ? setError(true)
                            : (
                                console.log(state),
                                base = state.track_window.current_track,

                                setSongName(base.name),
                                setSongImg(String(base.album.images[0].url)),
                                setSongArtist(String(base.artists[0].name)),
                                    console.log(error, log),
                                    setArtistImg(''),
                        setFollowersArtist(''),
                        setPlaylistName(''),
                        setPlaylistImg(''),
                        setFollowersPlaylist('')
                            )
                        }
                    )
            })

            const previous_btn = document.getElementById('previous-button') as HTMLButtonElement
            previous_btn.addEventListener('click', () => {
                player.previousTrack()
            })

            const play_btn = document.getElementById('play-button') as HTMLBodyElement
            play_btn.addEventListener('click', () => {
                player.togglePlay()
            })

            const next_btn = document.getElementById('next-button')!
            next_btn.addEventListener('click', () => {
                player.nextTrack()
            })

            Promise.all([player.connect()])
                .then(() => {
                    transferPlayback(deviceID)
                    player.togglePlay()
                })

            window.onbeforeunload = () => {
                player.disconnect()
            }
        }
    }, []);


    return (
        <>
            {!isMobileVersion()
                ? (
                    <>
                        <UpdateDesktop artistName={songArtist}
                                       artistImg={artistImg}
                                       followersArtist={followersArtist}
                                       songImg={songImg}
                                       songName={songName}
                                       songArtist={songArtist}
                                       playlistName={playlistName}
                                       playlistImg={playlistImg}
                                       followersPlaylist={followersPlaylist}/>
                        <UpdateTitle title={songName}/>
                    </>
                )
                : (
                    <>
                        <UpdateMobile songImg={songImg}
                                      songName={songName}
                                      songArtist={songArtist}
                                      artistName={songArtist}
                                      artistImg={artistImg}
                                      followersArtist={followersArtist}/>
                    </>
                )}

        </>
    )
}

export default useLoadSpotifyWebPlayback