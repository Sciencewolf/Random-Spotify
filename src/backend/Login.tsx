import '../style/Login.css'

function Login() {
    const client_id = import.meta.env.VITE_CLIENT_ID;
    const redirect_uri = import.meta.env.VITE_PRODUCTION
    const auth_point = import.meta.env.VITE_AUTH_POINT
    const response_type = "token"

    const scopes = [
        'streaming',
        'user-read-recently-played',
        'user-read-currently-playing',
        'user-read-playback-state',
        'user-modify-playback-state',
        'user-library-read',
        'user-library-modify',
        'user-top-read',
        'playlist-read-private',
        'playlist-modify-public',
        'playlist-modify-private',
    ].join(' ').replace(' ', '%20');

    return (
        <>
            {redirect_uri === import.meta.env.VITE_PRODUCTION
                ? (
                    console.clear(),
                    window.localStorage.setItem('prod', "true")
                )
                : window.localStorage.setItem('prod', "false")}
            <div className={"login"}
                 id={"login"}>
                <a href={`${auth_point}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes}&response_type=${response_type}&show_dialog=true`}
                   className={"login-a"}
                >
                    Log in with Spotify
                </a>
            </div>
        </>
    )
}

export default Login;