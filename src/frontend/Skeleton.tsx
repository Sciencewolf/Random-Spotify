import '../style/Skeleton.css'
import {useState} from "react";
import Main from "../backend/Main.tsx";

function Skeleton(props: {imgSRC: string, songName: string, songArtist: string}) {
    const [isClicked, setIsClicked] = useState(false)

    function handleClick() {
        setIsClicked(true)
    }

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
                <h5 className={"songArtist-h5"}
                    id={"songArtist-h5"}
                />
                <button className={"play-button"}
                        id={"play-button"}
                        onClick={() => handleClick()}
                >
                    <img src={"https://img.icons8.com/windows/32/play--v1.png"}
                         alt={"play-btn"}
                         id={"play-button-img"}
                    />
                </button>
            </div>

            {isClicked ? <Main/> : ""}
        </>
    )
}

export default Skeleton;