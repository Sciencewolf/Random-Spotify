
function UpdateSkeleton(props: {songImg: string, songName: string, songLen: number}) {
    const songImg: HTMLElement | null = document.getElementById("song-img");
    const songName: HTMLElement | null = document.getElementById("songName-h2");
    const songLen:HTMLElement | null = document.getElementById("songLen-h4");

    // @ts-ignore
    songImg.src = props.songImg;
    // @ts-ignore
    songName.innerHTML = props.songName;
    // @ts-ignore
    songLen.innerHTML = props.songLen.toString();

    return (
        <></>
    )

}

export default UpdateSkeleton;