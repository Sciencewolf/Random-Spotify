import '../style/Login.css'

function Login() {
    const client_id = import.meta.env.VITE_CLIENT_ID;
    const redirect_uri = import.meta.env.VITE_TEST
    const auth_point = import.meta.env.VITE_AUTH_POINT
    const response_type = "token"

    return (
        <>
            <div className={"login"}
                 id={"login"}>
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