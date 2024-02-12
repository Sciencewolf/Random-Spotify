async function getPlaylistSongs() {
    /*
    "37i9dQZF1DWWY64wDtewQt", // phonk
        "37i9dQZF1DX0h2LvJ7ZJ15", // slowed and reverbed
        "37i9dQZF1DWYN9NBqvY7Tx" // ultra gaming
     */

    const response = await fetch("https://api.spotify.com/v1/playlists/37i9dQZF1DWWY64wDtewQt/tracks?limit=50",
        {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}`
            },
            method: "GET",
    })

    if(!response.ok){
        return;
    }

    const data = await response.json()
    console.log(data, 'data')
    // const playlistID = data.href.split('playlists/')[1].split('tracks/')[0]
    const items: string[] = []

    for (let i = 0; i < 50; i++) {
        items.push(data.items[i].track.uri)
    }

    console.log(items, 'items')

    return items
}

export default getPlaylistSongs