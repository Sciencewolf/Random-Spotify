import '../style/playlistOfSong.css'
import {PlaylistProps} from "../backend/Props.ts";

function showPlaylistOfSong({playlistImg, playlistName, followersPlaylist}: PlaylistProps) {
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
                <p className={"followers-p"}
                   id={"followers-p"}
                   style={{
                       userSelect: "none"
                   }}
                >
                    {followersPlaylist}
                </p>
            </div>
        </>
    )
}

export default showPlaylistOfSong