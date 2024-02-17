function mediaSession(player: Spotify.Player, base: Spotify.Track, artists: string){
    if("mediaSession" in window.navigator){
        window.navigator.mediaSession.metadata = new MediaMetadata({
            title: base.name,
            artist: artists,
            artwork: [
                { src: String(base.album.images[0].url), sizes: '96x96', type: 'image/png' },
                { src: String(base.album.images[0].url), sizes: '128x128', type: 'image/png' },
                { src: String(base.album.images[0].url), sizes: '192x192', type: 'image/png' },
                { src: String(base.album.images[0].url), sizes: '256x256', type: 'image/png' },
                { src: String(base.album.images[0].url), sizes: '384x384', type: 'image/png' },
                { src: String(base.album.images[0].url), sizes: '512x512', type: 'image/png' }
            ]
        })

        window.navigator.mediaSession.setActionHandler('nexttrack', () => {
            player.nextTrack()
        })

        window.navigator.mediaSession.setActionHandler('previoustrack', () => {
            player.previousTrack()
        })
    }
}

export default mediaSession