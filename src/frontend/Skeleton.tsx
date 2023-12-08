import '../style/Skeleton.css'

function Skeleton(props: {imgSRC: string, songName: string, songLen: number}) {
    return (
        <>
            <div className={"skeleton-div"} id={"skeleton-div"}>
                <img src={props.imgSRC} id={"song-img"} alt={"song-img"} />
                <h2 className={"songName-h2"} id={"songName-h2"} />
                <h4 className={"songLen-h4"} id={"songLen-h4"} />
                <button className={"play-button"} id={"play-button"}> Play </button>
            </div>
        </>
    )
}

export default Skeleton;