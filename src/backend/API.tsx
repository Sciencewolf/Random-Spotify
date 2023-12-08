import UpdateSkeleton from "./UpdateSkeleton.tsx";
import {useEffect, useState} from "react";

function API(): JSX.Element {
    const [songImg, setSongImg] = useState("")
    const [songName, setSongName] = useState("")
    const [songLen, setSongLen] = useState(0.0)


    // playlist fetch

    useEffect(() => {
        setSongImg("t")
        setSongName("3")
        setSongLen(0.5)
    }, []);

    return (
        <>
            <UpdateSkeleton songImg={songImg} songName={songName} songLen={songLen} />
        </>
    )
}

export default API;