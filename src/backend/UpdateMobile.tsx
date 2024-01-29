import UpdateSkeleton from "../frontend/UpdateSkeleton.tsx";
import Footer from "../frontend/Footer.tsx";
import {ArtistProps, PlaylistProps, Props, SongProps} from "./Props.ts";
import SetBackgroundColor from "../frontend/SetBackgroundColor.tsx";
import AboutTheArtist from "../frontend/AboutTheArtist.tsx";
import ShowPlaylistOnMobile from "../frontend/ShowPlaylistOnMobile.tsx";

function updateMobile({
                          playlistName,
                          songImg, songName, songArtist,
                          artistImg, followersArtist,
                          link
                      }: SongProps & ArtistProps & PlaylistProps & Props) {

    return (
        <>
            {playlistName != 'undefined'
                ? <ShowPlaylistOnMobile playlistName={playlistName}
                />
                : <></>}
            <UpdateSkeleton songImg={songImg}
                            songName={songName}
                            songArtist={songArtist}
            />
            <AboutTheArtist artistName={songArtist}
                            artistImg={artistImg}
                            followersArtist={followersArtist + " followers"}
            />
            <Footer isChangeFooterClassName={true}/>
            <SetBackgroundColor link={link == undefined ? "" : link} />
        </>
    )
}

export default updateMobile