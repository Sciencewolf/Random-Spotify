import '../style/App.css'
import Button from "./Button.tsx";
import Skeleton from "./Skeleton.tsx";

function App() {

  //   OAuth by Spotify
  return (
    <>
        <Skeleton imgSRC={""} songName={""} songLen={0.0}/>
        <Button />
    </>
  )
}

export default App
