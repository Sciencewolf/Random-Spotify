function updateTitle(props: {_title: string}) {
    const title = document.getElementById('title')
    // @ts-ignore
    title.innerHTML = props._title

    return (
        <>
        </>
    )
}

export default updateTitle;