import UAParser from "ua-parser-js";
import {useEffect, useState} from "react";
import UpdateDesktop from "./UpdateDesktop.tsx";
import {isMobileVersion} from "./isMobileVersion";
import UpdateMobile from "./UpdateMobile.tsx";
import transferPlayback from "./transferPlayback.ts";
import SetBackgroundColor from "../frontend/SetBackgroundColor.tsx";

// TODO: implement all functions inside this component
// TODO: update desktop or mobile components
function useLoadSpotifyWebPlayback() {
    const [songImg, setSongImg] = useState('')
    const [songArtist, setSongArtist] = useState('')
    const [songName, setSongName] = useState('')

    const [log, setLog] = useState('')

    let base: string | null | Spotify.Track = ''

    useEffect(() => {
        const browser = new UAParser();
        const playButtonImage: HTMLImageElement =
            document.querySelector('#play-button #play-button-img')!

        window.onSpotifyWebPlaybackSDKReady = async () => {
            const player = new Spotify.Player({
                getOAuthToken: cb => {
                    cb(`${window.localStorage.getItem('token')}`)
                },
                name: `Random Spotify (${browser.getBrowser().name})`,
                volume: 0.5
            })

            player.addListener('ready', ({device_id}) => {
                setLog((oldState) => oldState + device_id)
                transferPlayback(device_id)
            })

            player.addListener('not_ready', ({device_id}) => {
                console.log('not ready')
                setLog((oldState) => oldState + device_id)
            })

            player.addListener('player_state_changed', (state) => {
                if (!state) {
                    return;
                }

                player.getCurrentState().then(state => {
                        (!state)
                            ? setLog(oldState => oldState + 'error')
                            : (
                                console.log(state),
                                base = state.track_window.current_track,
                                setSongName(base.name),
                                setSongImg(String(base.album.images[0].url)),
                                setSongArtist(String(base.artists[0].name)),
                                console.log(log)
                            )
                        }
                    )
            })

            const previous_btn = document.getElementById('previous-button') as HTMLButtonElement
            const play_btn = document.getElementById('play-button') as HTMLButtonElement
            const next_btn = document.getElementById('next-button')!

            previous_btn.addEventListener('click', () => {
                player.previousTrack()
            })

            play_btn.addEventListener('click', () => {
                player.togglePlay()
                playButtonImage.src = 'https://img.icons8.com/ios-glyphs/30/circled-play.png'
            })

            next_btn.addEventListener('click', () => {
                player.nextTrack()
            })

            player.connect()
                .then((r) => {console.log(r)})
                .catch(err => console.log(err))

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
                        <UpdateDesktop songImg={songImg}
                                       songName={songName}
                                       songArtist={songArtist}
                                       title={songName + ' -  ' + songArtist}/>
                        <SetBackgroundColor link={songImg} />
                    </>
                )
                : (
                    <>
                        <UpdateMobile songImg={songImg}
                                      songName={songName}
                                      songArtist={songArtist}/>
                        <SetBackgroundColor link={songImg} />
                    </>
                )}

        </>
    )
}

export default useLoadSpotifyWebPlayback