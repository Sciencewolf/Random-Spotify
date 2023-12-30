export type Props = {
    description?: string
    errorCode?: number
    title?: string | undefined
    update?: boolean
    updateUserProfile?: boolean
    token?: string | undefined | null
}

export type SongProps =  {
    songImg: string
    songName: string
    songArtist: string
}

export type UserProps = {
    userIcon: string
    userName: string
}

export type ArtistProps = {
    artistName: string
    artistImg: string
    followersArtist: string
}

export type PlaylistProps = {
    playlistImg?: string
    playlistName?: string
    followersPlaylist?: string
    songUri?: string[]
}