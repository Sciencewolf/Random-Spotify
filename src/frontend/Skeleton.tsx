import '../style/Skeleton.css'
import {useState} from "react";
import Error from "./Error.tsx";

function Skeleton() {
    const [clicked, setClicked] = useState(false)

    return (
        <>
            {clicked ? (
                <>
                    <Error description={"Unauthorized"}
                           errorCode={401}
                    />
                </>
            ) : (
                <>
                    <div className={"skeleton-div"}
                         id={"skeleton-div"}
                    >
                        <div
                            id={"song-img"}
                        />
                        <h2 className={"songName-h2"}
                            id={"songName-h2"}
                        />
                        <h5 className={"songArtist-h5"}
                            id={"songArtist-h5"}
                        />
                        <div className={"controllers"}
                             id={"controllers"}
                        >
                            <button className={"previous-button"}
                                    id={"previous-button"}
                            >
                                <img src={"https://img.icons8.com/windows/32/backward-button.png"}
                                     alt={"previous-btn"}
                                     id={"previous-button-img"}
                                />
                            </button>
                            <button className={"play-button"}
                                    id={"play-button"}
                                    onClick={() => {
                                        setClicked(true)
                                    }}
                            >
                                <img src={"https://img.icons8.com/windows/32/play--v1.png"}
                                     alt={"play-btn"}
                                     id={"play-button-img"}
                                />
                            </button>
                            <button type={"button"}
                                    id={"next-button"}
                                    className={"next-button"}
                            >
                                <img src={"https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/24/external-next-multimedia-tanah-basah-basic-outline-tanah-basah.png"}
                                     alt={"next-btn"}
                                     id={"next-button-img"}
                                />
                            </button>
                        </div>
                    </div>
                </>
            )}

        </>
    )
}

export default Skeleton;