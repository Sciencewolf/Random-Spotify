import UpdateSkeleton from "../frontend/UpdateSkeleton.tsx";
import UpdateTitle from "../frontend/UpdateTitle.tsx";
import {ArtistProps, PlaylistProps, Props, SongProps} from "./Props.ts";
import SetBackgroundColor from "../frontend/SetBackgroundColor.tsx";
import AboutTheArtist from "../frontend/AboutTheArtist.tsx";
import LoadingCard from "../frontend/LoadingCard.tsx";
import ShowPlaylistOfSong from "../frontend/ShowPlaylistOfSong.tsx";
import LoadComponents from "./LoadComponents.tsx";

function updateDesktop({
                       artistName, artistImg, followersArtist,
                       songImg, songName, songArtist,
                       playlistName, playlistImg, followersPlaylist, link,
                       title}: SongProps & ArtistProps & PlaylistProps & Props) {
    return (
        <>
            <LoadComponents />
            {artistName !== ''
                ? <AboutTheArtist artistName={artistName}
                                  artistImg={artistImg}
                                  followersArtist={followersArtist + " followers"}
                />
                : <LoadingCard />

            }
            <UpdateSkeleton songImg={songImg}
                            songName={songName}
                            songArtist={songArtist}
            />
            {playlistName != 'undefined' && playlistName !== ''
                ? <ShowPlaylistOfSong playlistName={playlistName}
                                      playlistImg={playlistImg}
                                      followersPlaylist={followersPlaylist}
                />
                : <LoadingCard/>}
            <UpdateTitle title={title} />
            <SetBackgroundColor link={link == undefined ? "" : link} />
        </>
    )

}

export default updateDesktop