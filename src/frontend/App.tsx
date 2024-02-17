import '../style/App.css'
import Login from "../backend/Login.tsx";
import Footer from "./Footer.tsx";
import Error from "./Error.tsx";
import LoadSpotifyWebPlayback from "../backend/LoadSpotifyWebPlayback.tsx";
import GetToken from "../backend/getToken.tsx";
import {Analytics} from "@vercel/analytics/react";
import Preview from "../backend/Preview.tsx";

function App() {
    window.onbeforeunload = function() {
        window.localStorage.removeItem('token')
        return
    }

    if(window.location.href.includes('access_token=')) {
        if(window.localStorage.getItem('preview') !== null){
            return (
                <>
                    <GetToken />
                    <Preview />
                    <Footer isChangeFooterClassName={false}/>
                </>
            )
        }
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
    else if(window.location.href.includes('/preview/')){
        window.localStorage.setItem('preview', window.location.href.split('/preview/')[1])
        return (
            <>
                <Login/>
                <Footer isChangeFooterClassName={false}/>
                <Analytics/>
            </>
        )
    } else {
        return (
            <>
                <Login/>
                <Footer isChangeFooterClassName={false}/>
                <Analytics/>
            </>
        )
    }
}

export default App
