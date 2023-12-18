import '../style/playlistOfSong.css'

function showPlaylistOfSong({playlistImg, playlistName}: Props) {
    return (
        <>
            <div className={"showPlaylistOfSong-div"}
                 id={"showPlaylistOfSong-div"}
            >
                <img src={playlistImg}
                     alt={"playlist-img"}
                />
                <h2 className={"playlistName-h2"}
                    id={"playlistName-h2"}
                >
                    {playlistName}
                </h2>
            </div>
        </>
    )
}

export default showPlaylistOfSong