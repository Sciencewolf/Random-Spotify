import UpdateLoginButton from "../frontend/UpdateLoginButton.tsx";
import AboutTheArtist from "../frontend/AboutTheArtist.tsx";
import UpdateSkeleton from "../frontend/UpdateSkeleton.tsx";
import ShowPlaylistOfSong from "../frontend/ShowPlaylistOfSong.tsx";
import Footer from "../frontend/Footer.tsx";
import UpdateTitle from "../frontend/UpdateTitle.tsx";
import {ArtistProps, PlaylistProps, Props, SongProps, UserProps} from "./Props.ts";

function updateDesktop({userIcon, userName,
                       artistName, artistImg, followersArtist,
                       songImg, songName, songArtist,
                       playlistImg, playlistName, followersPlaylist,
                       token, title}: UserProps & ArtistProps & SongProps & PlaylistProps & Props) {
    return (
        <>
            <UpdateLoginButton userIcon={userIcon}
                               userName={userName}
            />
            <AboutTheArtist artistName={artistName}
                            artistImg={artistImg}
                            followersArtist={followersArtist + " followers"}
            />
            <UpdateSkeleton songImg={songImg}
                            songName={songName}
                            songArtist={songArtist}
                            token={token}
            />
            <ShowPlaylistOfSong playlistImg={playlistImg}
                                playlistName={playlistName}
                                followersPlaylist={followersPlaylist}
            />
            <Footer/>
            <UpdateTitle title={title} />
        </>
    )

}

export default updateDesktop