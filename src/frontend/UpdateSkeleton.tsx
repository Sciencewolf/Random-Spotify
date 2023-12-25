import {PlaylistProps, Props, SongProps} from "../backend/Props.ts";
import {useEffect, useState} from "react";

function UpdateSkeleton({ songImg, songName, songArtist, token }: SongProps & PlaylistProps & Props): JSX.Element {
    const params: object = {
        width: 'unset',
        height: 'unset',
        backgroundColor: 'unset',
    }

    const [_player, setPlayer] = useState(undefined)

    const [isPaused, setIsPaused] = useState(false)
    const [isActive, setIsActive] = useState(false)

    // const [tracks, setTracks] = useState(songUris)

    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://sdk.scdn.co/spotify-player.js'
        script.async = true

        window.document.body.appendChild(script)

        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new Spotify.Player({
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                getOAuthToken: cb => { // @ts-expect-error
                    cb(token)} ,
                name: 'Web Player (Random Spotify)'
            })

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setPlayer(player)

            player.addListener('ready', ({device_id}) => {
                console.log('ready at', device_id)
            })

            player.addListener('not_ready', ({device_id}) => {
                console.log(device_id)
            })

            player.addListener('player_state_changed', (state) => {
                if(!state) return

                setIsPaused(state.paused)

                player.getCurrentState()
                    .then(state =>
                    {(!state) ? setIsActive(false) : setIsActive(true)}
                    )
            })
            console.log(isActive, isPaused)

            player.connect().then((r) => console.log(r)).catch((e) => console.log(e))
        }
    }, []);

    return (
        <>
            <div className={"skeleton-div"}
                 id={"skeleton-div"}
            >
                <img src={songImg}
                     alt="song-img loading"
                     style={params}
                     id="song-img"
                />
                <h2 className={"songName-h2"}
                    style={params}
                    id={"songName-h2"}
                >
                    {songName}
                </h2>
                <h5 className={"songArtist-h5"}
                    style={params}
                    id={"songArtist-h5"}
                >
                    {songArtist}
                </h5>
                <div className={"controllers"}
                     id={"controllers"}>
                    <button className={"previous-button"}
                            id={"previous-button"}
                            onClick={() => {
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-expect-error
                                _player.previousTrack()
                            }}
                    >
                        <img src={"https://img.icons8.com/windows/32/backward-button.png"}
                             alt={"previous-btn"}
                             id={"previous-button-img"}
                        />
                    </button>
                    <button className={"play-button"}
                            id={"play-button"}
                            onClick={() => {
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-expect-error
                                _player.togglePlay()}}
                    >
                        <img src={"https://img.icons8.com/windows/32/play--v1.png"}
                             alt={"play-btn"}
                             id={"play-button-img"}
                        />
                    </button>
                    <button type={"button"}
                            id={"next-button"}
                            className={"next-button"}
                            onClick={() => {
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-expect-error
                                _player.nextTrack()
                            }}
                    >
                        <img
                            src={"https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/24/external-next-multimedia-tanah-basah-basic-outline-tanah-basah.png"}
                            alt={"next-btn"}
                            id={"next-button-img"}
                        />
                    </button>
                </div>
            </div>
        </>
    )
        ;
}

export default UpdateSkeleton;
