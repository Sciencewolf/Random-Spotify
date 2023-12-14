import '../style/Login.css'

function Login() {
    const client_id = import.meta.env.VITE_CLIENT_ID;
    const redirect_uri = "http://localhost:5173" //   http://localhost:5173 https://random-spotify.vercel.app
    const auth_point = "https://accounts.spotify.com/authorize"
    const response_type = "token"

    return (
        <>
            <div className={"login"} id={"login"}>
                <a href={`${auth_point}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}`}
                   className={"login-a"}
                >
                    Login
                </a>
            </div>
        </>
    )
}

export default Login;