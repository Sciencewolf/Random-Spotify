import {PlaylistProps, Props, SongProps} from "../backend/Props.ts";
import handleControllers from "../backend/handleControllers.ts";

function UpdateSkeleton({ songImg, songName, songArtist }: SongProps & PlaylistProps & Props): JSX.Element {
    const params: object = {
        width: 'unset',
        height: 'unset',
        backgroundColor: 'unset',
    }

    // const [isPaused, setIsPaused] = useState(false)

    const playNext = () => {
        handleControllers({option: "next"}).catch(err => console.log(err))
    }

    const playPrevious = () => {
        handleControllers({option: "previous"}).catch(err => console.log(err))
    }

    // const pause = () => {
    //     handleControllers({option: "pause"}).catch(err => console.log(err))
    //     setIsPaused(true)
    // }

    // const play = () => {
    //     handleControllers({option: "play"}).catch(err => console.log(err))
    //     setIsPaused(false)
    // }

    return (
        <>
            <div className={"skeleton-div"}
                 id={"skeleton-div"}
            >
                <img src={songImg}
                     alt="song-img loading"
                     style={params}
                     id="song-img"
                />
                <h2 className={"songName-h2"}
                    style={params}
                    id={"songName-h2"}
                >
                    {songName}
                </h2>
                <h5 className={"songArtist-h5"}
                    style={params}
                    id={"songArtist-h5"}
                >
                    {songArtist}
                </h5>
                <div className={"controllers"}
                     id={"controllers"}>
                    <button className={"previous-button"}
                            id={"previous-button"}
                            onClick={() => {
                                playPrevious()
                            }}
                    >
                        <img src={"https://img.icons8.com/windows/32/backward-button.png"}
                             alt={"previous-btn"}
                             id={"previous-button-img"}
                        />
                    </button>
                    {/*TODO: handle play and pause events*/}
                    <button className={"play-button"}
                            id={"play-button"}
                    >
                        <img width={"32"}
                             height={"32"}
                             src={"https://img.icons8.com/windows/32/play--v1.png"}
                             alt={"play-btn"}
                             id={"play-button-img"}/>

                    </button>
                    <button type={"button"}
                            id={"next-button"}
                            className={"next-button"}
                            onClick={() => {
                                playNext()
                            }}
                    >
                        <img
                            src={"https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/24/external-next-multimedia-tanah-basah-basic-outline-tanah-basah.png"}
                            alt={"next-btn"}
                            id={"next-button-img"}
                        />
                    </button>
                </div>
            </div>
        </>
    )
}

export default UpdateSkeleton;
