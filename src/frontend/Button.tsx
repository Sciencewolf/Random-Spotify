import '../style/Button.css'
import API from "../backend/API.tsx";
import {useState} from "react";

function Button() {
    const [api, setApi] = useState(false)

    const handleClick = () => {
        setApi(true)
    }

    return (
        <>
            <button type={"submit"}
                    className={"get-button"}
                    onClick={() => {handleClick()}}
            >
                {api ? <API /> : ""} {/* call component */}
                Start
            </button>
        </>
    )
}

export default Button;