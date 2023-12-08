import '../style/App.css'
import Button from "./Button.tsx";
import Skeleton from "./Skeleton.tsx";
import Login from "../backend/Login.tsx";

function App() {

  return (
    <>
        <Login />
        <Skeleton imgSRC={""} songName={""} songArtist={""}/>
        <Button />
    </>
  )
}

export default App
