function UpdateSkeleton({ songImg, songName, songArtist }: Props): JSX.Element {
    const params: object = {
        width: 'unset',
        height: 'unset',
        backgroundColor: 'unset',
    }
    return (
        <>
            <div className={"skeleton-div"}
                 id={"skeleton-div"}>
                <img src={songImg}
                     alt="song-img loading"
                     style={params}
                     id="song-img"/>
                <h2 className={"songName-h2"}
                    style={params}
                    id={"songName-h2"}>
                    {songName}
                </h2>
                <h5 className={"songArtist-h5"}
                    style={params}
                    id={"songArtist-h5"}>
                    {songArtist}
                </h5>
                <button className={"play-button"}
                        id={"play-button"}
                >
                    <img src={"https://img.icons8.com/windows/32/play--v1.png"}
                         alt={"play-btn"}
                         id={"play-button-img"}
                    />
                </button>
            </div>
        </>
    )
        ;
}

export default UpdateSkeleton;
