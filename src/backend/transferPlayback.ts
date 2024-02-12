

async function transferPlayback(device_id: string) {
    const response = await fetch('https://api.spotify.com/v1/me/player', {
        headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`
        },
        method: 'PUT',
        body: JSON.stringify({"device_ids": [device_id]})
    })

    if(!response.ok) {
        console.log('error', response.status)
        return
    }

    console.log('transfer ready')
    // await play()
}

export default transferPlayback