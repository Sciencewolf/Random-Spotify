import UpdateSkeleton from "./UpdateSkeleton.tsx";
import {useEffect, useState} from "react";
import '../style/Skeleton.css'
function API(): JSX.Element {
    const [songImg, setSongImg] = useState("")
    const [songName, setSongName] = useState("")
    const [songArtist, setSongArtist] = useState("")

    // fetch

    useEffect(() => {
        setSongImg("https://www.highsnobiety.com/static-assets/dato/1696613224-drake-for-all-the-dogs-lyrics-0.jpg");
        setSongName("name");
        setSongArtist("artist");

    }, []);

    return (
        <>
            {/*// login */}

            <UpdateSkeleton songImg={songImg} songName={songName} songArtist={songArtist} />
        </>
    )
}

export default API;