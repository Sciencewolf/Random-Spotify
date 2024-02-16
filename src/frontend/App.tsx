import '../style/App.css'
import Login from "../backend/Login.tsx";
import Footer from "./Footer.tsx";
import Error from "./Error.tsx";
import LoadSpotifyWebPlayback from "../backend/LoadSpotifyWebPlayback.tsx";
import GetToken from "../backend/getToken.tsx";
import {Analytics} from "@vercel/analytics/react";

function App() {
    window.onbeforeunload = function() {
        window.localStorage.removeItem('token')
        return
    }

    if(window.location.href.includes('access_token=')) {
        return (
            <>
                <GetToken />
                <LoadSpotifyWebPlayback />
            </>
        )
    }
    else if(window.location.href.includes("error=")){
        window.location.hash = ''
        return (
            <>
                <Error description={"Access Denied"}
                       errorCode={403}/>
            </>
        )
    }
    else {
        return (
            <>
                <Login />
                <Footer isChangeFooterClassName={false}/>
                <Analytics />
            </>
        )
    }
}

export default App
