import '../style/Skeleton.css'
import {useState} from "react";
import API from "../backend/API.tsx";

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
                <h4 className={"songArtist-h4"}
                    id={"songArtist-h4"}
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

            {isClicked ? <API/> : ""}
        </>
    )
}

export default Skeleton;