import '../style/Error.css'
import Props from "../backend/Props.ts";

function error({description, errorCode}: Props) {
    return (
        <div className={'error-div'}
             id={'error-div'}>
            <h2 id={'error-h2'}>
                {description}
                <br />
                {errorCode === 404 ? "" : "Login to continue"}
                {""}
            </h2>
            <img src={`https://http.cat/images/${errorCode}.jpg`}
                 alt={'error-img'}
                 id={'error-img'}/>
        </div>
    )
}

export default error;