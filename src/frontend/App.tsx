import '../style/App.css'
import Skeleton from "./Skeleton.tsx";
import Login from "../backend/Login.tsx";


function App() {
    return (
        <>
            <Login />
            <Skeleton imgSRC={""} songName={""} songArtist={""}/>
        </>
    )
}

export default App
