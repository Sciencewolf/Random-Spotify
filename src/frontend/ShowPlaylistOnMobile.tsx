import Props from "../backend/Props.ts";

function showPlaylistOnMobile({playlistName}: Props) {
    return (
        <>
            <div className={"playlist-name"}>
                {playlistName}
            </div>
        </>
    )
}

export default showPlaylistOnMobile