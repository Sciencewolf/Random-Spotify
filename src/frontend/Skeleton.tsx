import '../style/Skeleton.css'

function Skeleton(props: {imgSRC: string, songName: string, songArtist: string}) {
    return (
        <>
            <div className={"skeleton-div"}
                 id={"skeleton-div"}>
                <img src={props.imgSRC}
                     id={"song-img"}
                     alt={"song-img"}
                />
                <h2 className={"songName-h2"}
                    id={"songName-h2"}
                />
                <h4 className={"songArtist-h4"}
                    id={"songArtist-h4"}
                />
                <button className={"play-button"}
                        id={"play-button"}>
                    <img src={"https://img.icons8.com/windows/32/play--v1.png"}
                         alt={"play-btn"}/>
                </button>
            </div>
        </>
    )
}

export default Skeleton;