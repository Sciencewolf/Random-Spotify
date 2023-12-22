import '../style/Error.css'
import {Props} from "../backend/Props.ts";
import UpdateTitle from "./UpdateTitle.tsx";
import Login from "../backend/Login.tsx";

function error({description, errorCode}: Props) {
    return (
        <>
            <div className={'error-div'}
                 id={'error-div'}>
                <h2 id={'error-h2'}>
                    {description}
                    <br/>
                    {errorCode === 404 ? "" : "Login to continue"}
                    {""}
                </h2>
                <img src={`https://http.cat/images/${errorCode}.jpg`}
                     alt={'error-img'}
                     id={'error-img'}/>
            </div>
            <UpdateTitle title={description} />
            <Login />
        </>
    )
}

export default error;