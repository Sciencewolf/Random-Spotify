
function API(props: { isPlaylist: boolean; }) {
    if(props.isPlaylist) {
        return (
            <>
                <h2>Playlist</h2>
            </>
        )
    }
    return (
        <>
            <h1>
                Hello
            </h1>
        </>
        )
}

export default API;