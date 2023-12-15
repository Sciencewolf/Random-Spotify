
function UpdateSkeleton(props: {songImg: string, songName: string, songArtist: string}) {
    const songImg: HTMLElement | null = document.getElementById("song-img");
    const songName: HTMLElement | null = document.getElementById("songName-h2");
    const songArtist:HTMLElement | null = document.getElementById("songArtist-h5");

    // @ts-ignore
    songImg.src = props.songImg;
    // @ts-ignore
    songName.innerHTML = props.songName;
    // @ts-ignore
    songArtist.innerHTML = props.songArtist;

    return (
        <></>
    )

}

export default UpdateSkeleton;