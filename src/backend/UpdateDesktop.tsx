import UpdateSkeleton from "../frontend/UpdateSkeleton.tsx";
import UpdateTitle from "../frontend/UpdateTitle.tsx";
import {PlaylistProps, Props, SongProps} from "./Props.ts";
import Footer from "../frontend/Footer.tsx";
import ShowPlaylistOfSong from "../frontend/ShowPlaylistOfSong.tsx";

function updateDesktop({
                           // artistName, artistImg, followersArtist,
                       songImg, songName, songArtist,
                       playlistName,
                       title}: SongProps & PlaylistProps & Props) {
    return (
        <>
            {/*<AboutTheArtist artistName={artistName}*/}
            {/*                artistImg={artistImg}*/}
            {/*                followersArtist={followersArtist + " followers"}*/}
            {/*/>*/}
            <UpdateSkeleton songImg={songImg}
                            songName={songName}
                            songArtist={songArtist}
            />
            {playlistName != 'undefined'
                ? <ShowPlaylistOfSong playlistName={playlistName} />
                : <></>}
            <UpdateTitle title={title} />
            <Footer isChangeFooterClassName={true}/>
        </>
    )

}

export default updateDesktop