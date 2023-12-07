import '../style/App.css'
import API from "../backend/API.tsx";
import Search from "./Search.tsx";

function App() {
  return (
    <>
        <API isPlaylist={true}/>
        <Search/>
    </>
  )
}

export default App
