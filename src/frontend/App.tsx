import '../style/App.css'
import Skeleton from "./Skeleton.tsx";
import Login from "../backend/Login.tsx";
import Footer from "./Footer.tsx";
import Main from "../backend/Main.tsx";
import Error from "./Error.tsx";


function App() {
    window.onbeforeunload = function() {
        window.localStorage.removeItem("token")
        return;
    }

    if(window.location.href.includes('access_token=')) {
        return (
            <>
                <Main />
            </>
        )
    }
    else if(window.location.href.includes("error=")){
        window.location.hash = ''
        return (
            <>
                <Error description={"Access Denied. Login to continue."}
                       errorCode={403}/>
                <Login />
            </>
        )
    }
    else return (
        <>
            <Login />
            <Skeleton />
            <Footer />
        </>
    )
}

export default App
