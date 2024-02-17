import transferPlayback from "./transferPlayback.ts";
import UAParser from "ua-parser-js";
import {useEffect, useState} from "react";
import '../style/Preview.css'
import UpdateTitle from "../frontend/UpdateTitle.tsx";
import SetBackgroundColor from "../frontend/SetBackgroundColor.tsx";
import LoadComponents from "./LoadComponents.tsx";
import mediaSession from "./mediaSession.ts";

function usePreview() {
    const [songName, setSongName] = useState('')
    const [songArtist, setSongArtist] = useState('')
    const [songImg, setSongImg] = useState('')

    let artists: string = ''
    const pauseIcon: string = 'https://assets.dryicons.com/uploads/icon/svg/9893/ef127c46-38b9-4cf5-bd27-4474e15b105c.svg'
    const playIcon: string = 'https://img.icons8.com/windows/32/play--v1.png'

    useEffect(() => {
        const browser = new UAParser()
        const playButtonImage = document.getElementById('play-button-img') as HTMLImageElement

        window.onSpotifyWebPlaybackSDKReady = async() => {
            const player = new Spotify.Player({
                getOAuthToken: cb => {
                    cb(`${window.localStorage.getItem('token')}`)
                },
                name: `Random Spotify Preview (${browser.getBrowser().name})`,
                volume: 0.5
            })

            player.addListener('ready', ({device_id}) => {
                transferPlayback(device_id, true, window.localStorage.getItem('preview') ?? '');
            })

            player.addListener('not_ready', ({device_id}) => {
                console.log('not_ready' + device_id)
            })

            player.addListener('player_state_changed', (state) => {
                if(!state){
                    return
                }

                player.getCurrentState().then(() => {
                    if (!state){
                        return
                    }

                    console.log(state, 'state')
                    setSongName(state.track_window.current_track.name)
                    setSongImg(state.track_window.current_track.album.images[0].url)

                    if(state.track_window.current_track.artists.length === 1){
                        artists = ''
                        setSongArtist(String(state.track_window.current_track.artists[0].name))
                        artists += state.track_window.current_track.artists[0].name
                    }else {
                        artists = ''
                        setSongArtist(state.track_window.current_track.artists[0].name)
                        artists += state.track_window.current_track.artists[0].name

                        for(let i = 1; i < state.track_window.current_track.artists.length; i++){
                            const str = state.track_window.current_track.artists[i].name
                            setSongArtist((oldState) => oldState + ', ' + str)
                            artists += ', ' + str
                        }
                    }

                    if (!state.paused) {
                        playButtonImage.src = pauseIcon
                        playButtonImage.style.width = '32px'
                        playButtonImage.style.height = '32px'
                    } else {
                        playButtonImage.src = playIcon
                    }
                    console.log(artists)

                    if (window.localStorage.getItem('prod') === 'true') {
                        console.clear()
                    }

                    mediaSession(player, state.track_window.current_track, artists)
                })
            })

            await player.connect()

            const play_btn = document.getElementById('play-btn') as HTMLButtonElement
            play_btn.addEventListener('click', () => {
                player.togglePlay()
            })

            // play song on space press
            window.document.addEventListener('keypress', e => {
                if(e.code === 'Space') {
                    player.togglePlay()
                }
            })

            window.onbeforeunload = window.onunload = () => {
                window.localStorage.removeItem('preview')
                window.localStorage.removeItem('token')
                player.disconnect();
            };
        }
    }, []);

    return (
        <>
            <div className={"preview"}
                 id={'preview'}>
                <img id={'preview-img'}
                     alt={'preview-img'}
                     src={songImg}/>
                <h2 className={'songName'}
                    id={'songName'}>
                    {songName}
                </h2>
                <p className={'songArtist'}
                   id={'songArtist'}>
                    {songArtist}
                </p>
                <button type={'button'}
                        id={'play-btn'}
                        className={'play-btn'}>
                    <img width={"32"}
                         height={"32"}
                         src={"https://img.icons8.com/windows/32/play--v1.png"}
                         alt={"play-btn"}
                         id={"play-button-img"}/>
                </button>
            </div>
            <LoadComponents />
            <UpdateTitle title={songName !== '' ? songName + ' • ' + songArtist : "Random Spotify"}/>
            <SetBackgroundColor link={songImg}/>
        </>
    )
}

export default usePreview