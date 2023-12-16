import '../style/Skeleton.css'

function Skeleton() {
    return (
        <>
            <div className={"skeleton-div"}
                 id={"skeleton-div"}>
                <div
                     id={"song-img"}
                />
                <h2 className={"songName-h2"}
                    id={"songName-h2"}
                />
                <h5 className={"songArtist-h5"}
                    id={"songArtist-h5"}
                />
                <button className={"play-button"}
                        id={"play-button"}
                >
                    <img src={"https://img.icons8.com/windows/32/play--v1.png"}
                         alt={"play-btn"}
                         id={"play-button-img"}
                    />
                </button>
            </div>
        </>
    )
}

export default Skeleton;