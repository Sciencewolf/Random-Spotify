import UpdateLoginButton from "../frontend/UpdateLoginButton.tsx";
import ShowPlaylistOnMobile from "../frontend/ShowPlaylistOnMobile.tsx";
import UpdateSkeleton from "../frontend/UpdateSkeleton.tsx";
import AboutTheArtist from "../frontend/AboutTheArtist.tsx";
import Footer from "../frontend/Footer.tsx";
import {ArtistProps, PlaylistProps, Props, SongProps, UserProps} from "./Props.ts";

function updateMobile({
                      userIcon, userName,
                      playlistName, songImg,
                      songName, songArtist,
                      artistImg, followersArtist
    }: UserProps & PlaylistProps & SongProps & ArtistProps & Props) {

    return (
        <>
            <UpdateLoginButton userIcon={userIcon}
                               userName={userName}
            />
            <ShowPlaylistOnMobile playlistName={playlistName}/>
            <UpdateSkeleton songImg={songImg}
                            songName={songName}
                            songArtist={songArtist}
            />
            <AboutTheArtist artistName={songArtist}
                            artistImg={artistImg}
                            followersArtist={followersArtist + " followers"}
            />
            <Footer />
        </>
    )
}

export default updateMobile