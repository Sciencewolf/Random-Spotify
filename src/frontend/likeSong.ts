async function likeSong(id: string) {
    const response = await fetch(`https://api.spotify.com/v1/me/tracks?ids=${id}`, {
        headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`
        },
        method: 'PUT',
    })

    if (!response.ok){
        return
    }

    const img = document.getElementById('like-img') as HTMLImageElement
    img.src = 'https://img.icons8.com/ios-glyphs/60/40C057/like--v1.png'

}

export default likeSong