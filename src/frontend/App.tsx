import '../style/App.css'
import Login from "../backend/Login.tsx";
import Footer from "./Footer.tsx";
import Error from "./Error.tsx";
import LoadSpotifyWebPlayback from "../backend/LoadSpotifyWebPlayback.tsx";
import LoadComponents from "../backend/LoadComponents.tsx";
import GetToken from "../backend/getToken.tsx";
import {SpeedInsights} from "@vercel/speed-insights/react";

function App() {
    window.onbeforeunload = function() {
        window.localStorage.removeItem('token')
        window.localStorage.setItem('load', 'true')
        return
    }

    if(window.location.href.includes('access_token=')) {
        return (
            <>
                {window.localStorage.getItem('load') !== 'true'
                    ? window.localStorage.setItem('load', 'true')
                : <></>}
                <GetToken />
                <LoadSpotifyWebPlayback />
                <LoadComponents />
                {/*<SetSongQueue />*/}
                <SpeedInsights />
            </>
        )
    }
    else if(window.location.href.includes("error=")){
        window.location.hash = ''
        return (
            <>
                <Error description={"Access Denied"}
                       errorCode={403}/>
                <Login />
                <SpeedInsights />
            </>
        )
    }
    else {
        return (
            <>
                <Login />
                <Footer isChangeFooterClassName={false}/>
                <SpeedInsights />
            </>
        )
    }
}

export default App
