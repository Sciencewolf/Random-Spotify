import UAParser from "ua-parser-js";
import {useEffect, useState} from "react";
import UpdateDesktop from "./UpdateDesktop.tsx";
import {isMobileVersion} from "./isMobileVersion";
import UpdateMobile from "./UpdateMobile.tsx";
import transferPlayback from "./transferPlayback.ts";

function useLoadSpotifyWebPlayback() {
    const [songImg, setSongImg] = useState('')
    const [songArtist, setSongArtist] = useState('')
    const [songName, setSongName] = useState('')

    const [artistName, setArtistName] = useState('')
    const [artistImg, setArtistImg] = useState('')
    const [artistFollowers, setArtistFollowers] = useState('')

    const [playlistImg, setPlaylistImg] = useState('')
    const [playlistName, setPlaylistName] = useState('')
    const [playlistFollowers, setPlaylistFollowers] = useState('')

    const [log, setLog] = useState('')

    let base: string | null | Spotify.Track = ''

    let touchstartX = 0
    let touchendX = 0

    const pauseIcon: string = 'https://assets.dryicons.com/uploads/icon/svg/9893/ef127c46-38b9-4cf5-bd27-4474e15b105c.svg'
    const playIcon: string = 'https://img.icons8.com/windows/32/play--v1.png'

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
                        if (!state) {
                            setLog(oldState => oldState + 'error');
                        } else {
                            if (window.localStorage.getItem('load') === 'true' && !state.loading) {
                                play_btn.click();
                                window.localStorage.setItem('load', 'false')
                            }
                            console.log(state, 'state');
                            base = state.track_window.current_track;
                            setSongName(base.name);
                            setSongImg(String(base.album.images[0].url));

                            if(base.artists.length === 1) {
                                setSongArtist(String(base.artists[0].name));
                            }else {
                                setSongArtist(base.artists[0].name)
                                for(let index = 1;index < base.artists.length;index++){
                                    const str = base.artists[index].name;
                                    setSongArtist((oldState) => oldState + ', ' + str)
                                }
                            }

                            // @ts-ignore
                            setPlaylistName(String(state['context']['metadata']['context_description']))
                            console.log(log);

                            // loading functions
                            // @ts-ignore
                            playlist(String(state['context']['uri'].split(':').pop()))
                            artist(String(base.artists[0].uri.split(':').pop()))

                            if(window.localStorage.getItem('prod') === 'true'){
                                console.clear()
                            }

                            if(!state.paused){
                                playButtonImage.src = pauseIcon
                                playButtonImage.style.width = '32px'
                                playButtonImage.style.height = '32px'
                            }else {
                                playButtonImage.src = playIcon
                            }
                        }
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
            })

            next_btn.addEventListener('click', () => {
                player.nextTrack()
            })

            await player.connect()

            window.onbeforeunload = () => {
                window.localStorage.setItem('load', 'true')
                player.disconnect()
            }

            // play song on space press
            window.document.addEventListener('keypress', e => {
                if(e.code === 'Space') {
                    player.togglePlay()
                }
            })

            // left arrow key do play previous song
            window.document.addEventListener('keydown', e => {
                if(e.key === 'ArrowLeft'){
                    player.previousTrack()
                }
            })

            // right arrow key to play next song
            window.document.addEventListener('keydown', e => {
                if(e.key === 'ArrowRight'){
                    player.nextTrack()
                }
            })

            window.document.addEventListener('touchstart', e => {
                touchstartX = e.changedTouches[0].screenX
            })

            window.document.addEventListener('touchend', e => {
                touchendX = e.changedTouches[0].screenX
                checkDirection()
            })

            window.onunload = () => {
                player.disconnect()
            }

            function checkDirection() {
                if (touchendX < touchstartX) player.nextTrack()
                if (touchendX > touchstartX) player.previousTrack()
            }
        }

    }, []);

    async function playlist(id: string) {
        try {
            const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`
                }
            })

            if (!response.ok) {
                return;
            }

            const getJson = await response.json();
            setPlaylistImg(getJson.images[0].url)

            setPlaylistFollowers(formatFollowers(+getJson.followers.total) + ' followers')

        } catch (err) {
            console.log(err)
        }
    }

    async function artist(id: string) {
        try {
            const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`
                }
            })

            if(!response.ok){
                return
            }

            const data = await response.json()

            setArtistName(data.name)
            setArtistImg(data.images[1].url)

            setArtistFollowers(formatFollowers(+data.followers.total))
        }catch (err){
            console.log(err)
        }
    }

    function formatFollowers(total: number) {
        let followers: string = ''

        if(total < 1000){
            followers = total.toString()
        }
        else if(total < 100_000) {
            followers = String((total / 1_000)
                .toPrecision(2))
                .replace('.', ',') + 'K'
        }
        else if(total < 1_000_000) {
            followers = String((total / 1_000)
                .toPrecision(3)
                .replace('.', ',')) + 'K'
        }
        else {
            followers = String((total / 1_000_000)
                .toPrecision(3))
                .replace('.', ',') + 'M'
        }

        return followers
    }

    return (
        <>
            {window.localStorage.getItem('prod') === 'true' && console.clear()}
            {!isMobileVersion()
                ? (
                    <>
                        <UpdateDesktop songImg={songImg}
                                       songName={songName}
                                       songArtist={songArtist}
                                       artistName={artistName}
                                       artistImg={artistImg}
                                       followersArtist={artistFollowers}
                                       playlistName={playlistName}
                                       playlistImg={playlistImg}
                                       followersPlaylist={playlistFollowers}
                                       link={songImg}
                                       title={songName !== '' ? songName + ' • ' + songArtist : "Random Spotify"}
                        />
                    </>
                )
                : (
                    <>
                        <UpdateMobile songImg={songImg}
                                      songName={songName}
                                      songArtist={songArtist}
                                      artistName={artistName}
                                      artistImg={artistImg}
                                      followersArtist={artistFollowers}
                                      playlistName={playlistName}
                                      link={songImg}
                        />
                    </>
                )}

        </>
    )
}

export default useLoadSpotifyWebPlayback