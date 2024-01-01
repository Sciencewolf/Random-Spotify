export default async function handleControllers(props: {option: string}) {
    const response = await fetch(`https://api.spotify.com/v1/me/player/${props.option}`, {
        headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`
        },
        method: 'POST',
    })

    if (!response.ok) {
        console.log('error', response.status)
        return
    }
}