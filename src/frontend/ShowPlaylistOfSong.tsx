import '../style/playlistOfSong.css'

function showPlaylistOfSong(props: {playlistImg: string, playlistName: string}) {
    return (
        <>
            <div className={"showPlaylistOfSong-div"} id={"showPlaylistOfSong-div"}>
                <img src={props.playlistImg} alt={"playlist-img"} />
                <h2 className={"playlistName-h2"} id={"playlistName-h2"}>
                    {props.playlistName}
                </h2>
            </div>
        </>
    )
}

export default showPlaylistOfSong