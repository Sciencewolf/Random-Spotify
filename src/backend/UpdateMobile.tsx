// import ShowPlaylistOnMobile from "../frontend/ShowPlaylistOnMobile.tsx";
import UpdateSkeleton from "../frontend/UpdateSkeleton.tsx";
// import AboutTheArtist from "../frontend/AboutTheArtist.tsx";
import Footer from "../frontend/Footer.tsx";
import {Props, SongProps} from "./Props.ts";

function updateMobile({
                          // playlistName,
                          songImg,
                          songName, songArtist,
                          // artistImg, followersArtist,
                          token
                      }: SongProps & Props) {

    return (
        <>
            {/*<ShowPlaylistOnMobile playlistName={playlistName}/>*/}
            <UpdateSkeleton songImg={songImg}
                            songName={songName}
                            songArtist={songArtist}
                            token={token}
            />
            {/*<AboutTheArtist artistName={songArtist}*/}
            {/*                artistImg={artistImg}*/}
            {/*                followersArtist={followersArtist + " followers"}*/}
            {/*/>*/}
            <Footer isChangeFooterClassName={true}/>
        </>
    )
}

export default updateMobile