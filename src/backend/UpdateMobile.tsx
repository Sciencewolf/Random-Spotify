import UpdateSkeleton from "../frontend/UpdateSkeleton.tsx";
import Footer from "../frontend/Footer.tsx";
import {PlaylistProps, Props, SongProps} from "./Props.ts";
import ShowPlaylistOnMobile from "../frontend/ShowPlaylistOnMobile.tsx";

function updateMobile({
                          playlistName,
                          songImg,
                          songName, songArtist,
                          // artistImg, followersArtist,
                          token
                      }: SongProps & PlaylistProps & Props) {

    return (
        <>
            <ShowPlaylistOnMobile playlistName={playlistName}/>
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