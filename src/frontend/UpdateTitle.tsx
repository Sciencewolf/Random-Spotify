function updateTitle(artist: string, trackName: string) {
    const title = document.getElementById('title')
    // @ts-ignore
    title.innerHTML = `${artist} - ${trackName}`

    return (
        <></>
    )
}

export default updateTitle