import UAParser from "ua-parser-js";
import {useEffect, useState} from "react";
import UpdateDesktop from "./UpdateDesktop.tsx";
import {isMobileVersion} from "./isMobileVersion.ts";
import UpdateMobile from "./UpdateMobile.tsx";
import transferPlayback from "./transferPlayback.ts";
import playlistSongs from "./PlaylistSongs.ts";
import mediaSession from "./mediaSession.ts";

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

    const [albumImg, setAlbumImg] = useState('')
    const [albumName, setAlbumName] = useState('')
    const [albumMeta, setAlbumMeta] = useState('')

    const [log, setLog] = useState('')
    let base: Spotify.Track
    let artists: string = ''
    let touchstartX = 0
    let touchendX = 0

    let timer: number | undefined

    const pauseIcon: string = 'https://assets.dryicons.com/uploads/icon/svg/9893/ef127c46-38b9-4cf5-bd27-4474e15b105c.svg'
    const playIcon: string = 'https://img.icons8.com/windows/32/play--v1.png'

    const volumeMuteIconDark: string = 'https://img.icons8.com/ios-glyphs/30/FFFFFF/no-audio--v1.png'
    const volumeMuteIconLight: string = 'https://img.icons8.com/ios-glyphs/30/no-audio--v1.png'
    const volumeUnmuteIconLight: string = 'https://img.icons8.com/ios-glyphs/30/medium-volume.png'
    const volumeUnmuteIconDark: string = 'https://img.icons8.com/ios-glyphs/30/FFFFFF/medium-volume.png'

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
                transferPlayback(device_id)
            })

            player.addListener('not_ready', ({device_id}) => {
                setLog((oldState) => oldState + 'not_ready' + device_id)
            })

            player.addListener('player_state_changed', async(state) => {
                if (!state) {
                    return;
                }

                const volume = document.getElementById('volume-input') as HTMLInputElement
                volume.value = String(await player.getVolume() * 100)

                //  try using web api not this
                player.getCurrentState().then(async state => {
                        if (!state) {
                            setLog(oldState => oldState + 'error');
                        } else {
                            console.log(state, 'state');
                            base = state.track_window.current_track;
                            setSongName(base.name);
                            setSongImg(String(base.album.images[0].url));

                            if (base.artists.length === 1) {
                                artists = ''
                                setSongArtist(String(base.artists[0].name));
                                artists += base.artists[0].name
                            } else {
                                artists = ''
                                setSongArtist(base.artists[0].name)
                                artists += base.artists[0].name;
                                for (let index = 1; index < base.artists.length; index++) {
                                    const str = base.artists[index].name;
                                    setSongArtist((oldState) => oldState + ', ' + str)
                                    artists += ', ' + str
                                }
                            }
                            await artist(String(base.artists[0].uri.split(':').pop()))

                            if (window.localStorage.getItem('prod') === 'true') {
                                console.clear()
                            }

                            if (!state.paused) {
                                playButtonImage.src = pauseIcon
                                playButtonImage.style.width = '32px'
                                playButtonImage.style.height = '32px'
                            } else {
                                playButtonImage.src = playIcon
                            }

                            mediaSession(player, base, artists)

                            if(state.context.uri?.includes('playlist')){
                                await playlist(state.context.uri?.split(':')[2])
                            }
                            else if(state.context.uri === ''){
                                await getPlaylistData(state.track_window.current_track.uri)
                            }else {
                                await album(base.album.uri.split(':')[2])
                            }
                        }
                    }
                )
            })

            const previous_btn = document.getElementById('previous-button') as HTMLButtonElement
            const play_btn = document.getElementById('play-button') as HTMLButtonElement
            const next_btn = document.getElementById('next-button')!
            const song_img = document.getElementById('song-img')!
            // prevent scroll when image is touched
            song_img.style.touchAction = 'none'

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

            window.onbeforeunload = window.onunload = () => {
                player.disconnect();
            };

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

            // swiping to play next/prev song on mobile
            song_img.addEventListener('touchstart', e => {
                touchstartX = e.changedTouches[0].screenX
            })

            song_img.addEventListener('touchend', e => {
                touchendX = e.changedTouches[0].screenX
                checkDirection(player)
            })

            if(!isMobileVersion()){
                await volumeComponent(player)
                footerComponent()
                shareComponent()
            }
        }

        return () => {
            clearTimeout(timer)
        }

    }, []);

    async function getPlaylistData(currentSong: string){
        const {items, mapOfSongs} = await playlistSongs(10)
        const playlistId: string = mapOfSongs.get(currentSong) ?? ''

        const prevSongIndex: number = items.findIndex((item) => {
            return item === currentSong
        }) - 1

        await playlist(playlistId)
        if(mapOfSongs.get(items[prevSongIndex]) !== mapOfSongs.get(currentSong)){
            console.log(mapOfSongs.get(items[prevSongIndex]), mapOfSongs.get(currentSong), 'playlistComparison')
        }
    }

    function checkDirection(player: Spotify.Player) {
        if (touchendX < touchstartX) player.nextTrack()
        if (touchendX > touchstartX) player.previousTrack()
    }

    async function volumeComponent(player: Spotify.Player){
        let previousValue: number = 0

        const divVolume = document.createElement('div')
        divVolume.id = 'div-volume'
        divVolume.className = 'div-volume'
        divVolume.style.cssText = 'display: flex; justify-content: center; align-items: center;'

        const imgVolumeIcon = document.createElement('img')
        imgVolumeIcon.id = 'img-volume'
        imgVolumeIcon.src = 'https://img.icons8.com/ios-glyphs/30/medium-volume.png'
        imgVolumeIcon.alt = 'volume-icon unmute'

        const volumeInput = document.createElement('input')
        volumeInput.className = 'volume-input'
        volumeInput.id = 'volume-input'
        volumeInput.type = 'range'
        volumeInput.tabIndex = -1
        volumeInput.value = String(await player.getVolume() * 100)
        volumeInput.max = '100'
        volumeInput.min = '0'
        volumeInput.step = '1'

        // good
        imgVolumeIcon.addEventListener('click', () => {
            if(imgVolumeIcon.alt.includes('unmute')){
                if(imgVolumeIcon.alt.includes('dark')){
                    imgVolumeIcon.src = volumeMuteIconLight
                    imgVolumeIcon.alt = 'volume-icon mute dark'
                }
                else if(imgVolumeIcon.alt.includes('light')){
                    imgVolumeIcon.src = volumeMuteIconDark
                    imgVolumeIcon.alt = 'volume-icon mute light'
                }

                previousValue = +volumeInput.value / 100
                player.setVolume(0)
                volumeInput.value = '0'
            }else if(imgVolumeIcon.alt.includes('mute')){
                if(imgVolumeIcon.alt.includes('dark')){
                    imgVolumeIcon.src = volumeUnmuteIconLight
                    imgVolumeIcon.alt = 'volume-icon unmute dark'
                }
                else if(imgVolumeIcon.alt.includes('light')){
                    imgVolumeIcon.src = volumeUnmuteIconDark
                    imgVolumeIcon.alt = 'volume-icon unmute light'
                }

                player.setVolume(previousValue)
                volumeInput.value = (previousValue * 100).toString()
            }
        })

        // TODO: implement icon feature on input
        volumeInput.addEventListener('input', () => {
            player.setVolume(+volumeInput.value / 100)
            volumeInput.blur()
        })

        divVolume.appendChild(imgVolumeIcon)
        divVolume.appendChild(volumeInput)
        document.body.appendChild(divVolume)
    }

    function footerComponent(){
        const footer = document.createElement('footer')
        footer.id = 'footer'
        footer.className = 'footer-after'
        footer.innerHTML = `
                <span>
                    Developed with <span id="heart">❤️</span> by
                </span>
                <span id="dev">
                    <a href="https://github.com/Sciencewolf" target="_blank">
                        Aron Marton
                    </a>
                </span>`

        document.body.appendChild(footer)

    }

    function shareComponent(){
        const button = document.createElement('button')
        button.id = 'btn-share'
        button.className = 'btn-share'
        button.tabIndex = -1
        button.innerHTML = '<img ' +
            'src="https://img.icons8.com/pulsar-line/48/share-rounded.png" ' +
            'alt="share-rounded" ' +
            'id="img-share" ' +
            'tabindex="-1"/>'

        button.addEventListener('click', () => {
            button.value = base.id ?? ''
            window
                .navigator
                .clipboard
                .writeText(import.meta.env.VITE_PRODUCTION + 'preview/' + base.id)
                .then(() => {
                    const popUp = document.createElement('span')
                    popUp.id = 'popup'
                    popUp.className = 'popup'
                    popUp.innerHTML = '✅ Copied!'
                    popUp.tabIndex = -1

                    document.body.appendChild(popUp)
                    timer = setTimeout(() => {
                        document.body.removeChild(popUp)
                        button.blur()
                    }, 3500)
                })
            button.blur()
        })

        document.body.appendChild(button)
    }

    async function playlist(id: string | undefined) {
        if(id === undefined)return

        try {
            const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`
                }
            })

            if (!response.ok) {
                setPlaylistName('undefined')
                return;
            }

            setAlbumMeta('')
            setAlbumImg('')
            setAlbumName('')

            const getJson = await response.json();
            setPlaylistImg(getJson.images[0].url)
            setPlaylistName(getJson.name)
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

    async function album(id: string){
        const response = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`
            }
        })

        if(!response.ok){
            return
        }

        setPlaylistName('')
        setPlaylistImg('')
        setPlaylistFollowers('0 followers')

        const data = await response.json()
        console.log(data, 'album')

        setAlbumImg(data.images[1].url)
        setAlbumName(data.name)
        const year: string = data.release_date
        setAlbumMeta(data.album_type + ' • ' + year.split('-')[0])
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

        console.log(log)

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
                                       playlistName={playlistName !== '' ? playlistName : albumName}
                                       playlistImg={playlistImg !== '' ? playlistImg : albumImg}
                                       followersPlaylist={albumMeta !== '' ? albumMeta : playlistFollowers}
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
                                      playlistName={playlistName !== '' ? playlistName : albumName}
                                      link={songImg}
                        />
                    </>
                )}

        </>
    )
}

export default useLoadSpotifyWebPlayback