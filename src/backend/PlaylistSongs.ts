async function getPlaylistSongs(limit: number) {
    const items: string[] = []
    const mapOfSongs: Map<string, string> = new Map<string, string>();

    const responsePhonk = await fetch(`https://api.spotify.com/v1/playlists/37i9dQZF1DWWY64wDtewQt/tracks?limit=${limit}`,
        {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}`
            },
            method: "GET",
    })

    if(!responsePhonk.ok){
        console.log('error at phonk')
    }else {
        const dataPhonk = await responsePhonk.json()
        const playlistIdPhonk: string = dataPhonk.href.split('playlists/')[1].split('/tracks')[0]

        for (let i = 0; i < limit; i++) {
            items.push(dataPhonk.items[i].track.uri)
            mapOfSongs.set(dataPhonk.items[i].track.uri, playlistIdPhonk)
        }
    }

    const responseUltraGaming = await fetch(`https://api.spotify.com/v1/playlists/37i9dQZF1DWYN9NBqvY7Tx/tracks?limit=${limit}`,
        {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}`
            },
            method: "GET",
        })

    if(!responseUltraGaming.ok){
        console.log('error at ultra gaming')
    }else {
        const dataUltraGaming = await responseUltraGaming.json()
        const playlistIdUltraGaming: string = dataUltraGaming.href.split('playlists/')[1].split('/tracks')[0]

        for (let i = 0; i < limit; i++) {
            items.push(dataUltraGaming.items[i].track.uri)
            mapOfSongs.set(dataUltraGaming.items[i].track.uri, playlistIdUltraGaming)
        }
    }

    return {items, mapOfSongs}
}

export default getPlaylistSongs