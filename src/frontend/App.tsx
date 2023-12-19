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
                <Footer />
            </>
        )
    }
    else if(window.location.href.includes("error=")){
        return (
            <>
                <Error description={"Access Denied"} errorCode={403}/>
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
