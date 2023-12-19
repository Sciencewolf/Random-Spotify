import '../style/Error.css'

function error({description, errorCode}: Props) {

    return (
        <div className={'error-div'}
             id={'error-div'}>
            <h3 id={'error-h3'}>
                {description}
            </h3>
            <img src={`https://http.cat/images/${errorCode}.jpg`}
                 alt={'error-img'}
                 id={'error-img'}/>
        </div>
    )
}

export default error;