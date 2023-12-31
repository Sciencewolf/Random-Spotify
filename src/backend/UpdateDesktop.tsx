import UpdateLoginButton from "../frontend/UpdateLoginButton.tsx";
import AboutTheArtist from "../frontend/AboutTheArtist.tsx";
import UpdateSkeleton from "../frontend/UpdateSkeleton.tsx";
import ShowPlaylistOfSong from "../frontend/ShowPlaylistOfSong.tsx";
import UpdateTitle from "../frontend/UpdateTitle.tsx";
import {ArtistProps, PlaylistProps, Props, SongProps, UserProps} from "./Props.ts";
import Footer from "../frontend/Footer.tsx";

function updateDesktop({userIcon, userName,
                       artistName, artistImg, followersArtist,
                       songImg, songName, songArtist,
                       playlistImg, playlistName, followersPlaylist,
                       title}: UserProps & ArtistProps & SongProps & PlaylistProps & Props) {
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
            />
            <ShowPlaylistOfSong playlistImg={playlistImg}
                                playlistName={playlistName}
                                followersPlaylist={followersPlaylist}
            />
            <UpdateTitle title={title} />
            <Footer isChangeFooterClassName={true}/>
        </>
    )

}

export default updateDesktop