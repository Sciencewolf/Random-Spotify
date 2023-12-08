export default function Error(props: {message: string}) {
    return (
        <>
            <h1>
                Error: {props.message}
            </h1>
        </>
    )
}