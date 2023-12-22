import {PlaylistProps} from "../backend/Props.ts";

function showPlaylistOnMobile({playlistName}: PlaylistProps) {
    return (
        <>
            <div className={"playlist-name"}>
                {playlistName}
            </div>
        </>
    )
}

export default showPlaylistOnMobile