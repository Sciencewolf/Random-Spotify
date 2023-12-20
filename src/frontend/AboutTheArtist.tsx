import '../style/aboutArtist.css'
import Props from "../backend/Props.ts";


function aboutTheArtist({artistName, artistImg, followers}: Props) {
    return (
        <>
            <div className={"aboutArtist-div"}
                 id={"aboutArtist"}
            >
                <img src={artistImg}
                     alt={"artist-name"}
                     id={"artist-img"}
                />
                <h2 className={"artistName"}
                    id={"artistName"}
                >
                    {artistName}
                </h2>
                <p className={"artistDescription"}
                   id={"artistDescription"}
                   style={{
                       userSelect: "none"
                   }}
                >
                    {followers}
                </p>
            </div>
        </>
    )
}

export default aboutTheArtist;