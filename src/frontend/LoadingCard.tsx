import '../style/playlistOfSong.css'

function loadingCard() {
    return (
        <>
            <div className={"loadingCard"}
                 id={"loadingCard"}>
                <div className="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </>
    )
}

export default loadingCard