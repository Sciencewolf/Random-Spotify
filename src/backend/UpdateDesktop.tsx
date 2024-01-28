import UpdateSkeleton from "../frontend/UpdateSkeleton.tsx";
import UpdateTitle from "../frontend/UpdateTitle.tsx";
import {ArtistProps, PlaylistProps, Props, SongProps} from "./Props.ts";
import Footer from "../frontend/Footer.tsx";
import ShowPlaylistOfSong from "../frontend/ShowPlaylistOfSong.tsx";
import SetBackgroundColor from "../frontend/SetBackgroundColor.tsx";
import AboutTheArtist from "../frontend/AboutTheArtist.tsx";

function updateDesktop({
                       artistName, artistImg, followersArtist,
                       songImg, songName, songArtist,
                       playlistName, playlistImg, followersPlaylist, link,
                       title}: SongProps & ArtistProps & PlaylistProps & Props) {
    return (
        <>
            <AboutTheArtist artistName={artistName}
                            artistImg={artistImg}
                            followersArtist={followersArtist + " followers"}
            />
            <UpdateSkeleton songImg={songImg}
                            songName={songName}
                            songArtist={songArtist}
            />
            <ShowPlaylistOfSong playlistName={playlistName}
                                playlistImg={playlistImg}
                                followersPlaylist={followersPlaylist}
            />
            <UpdateTitle title={title} />
            <Footer isChangeFooterClassName={true}/>
            <SetBackgroundColor link={link == undefined ? "" : link} />
        </>
    )

}

export default updateDesktop