export default async function handleControllers(props: {option: string, isPlayOrPause: boolean, uris: string[]}) {
    if(!props.isPlayOrPause) {
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
    else await playOrPause( props.option, props.uris)
}

export async function playOrPause(option: string, uris: string[]) {
    const response = await fetch(`https://api.spotify.com/v1/me/player/${option}`, {
        headers: {

        },
        method: 'PUT',
        body: JSON.stringify({'uris': [...uris]})
    })

    if(!response.ok) {
        console.log('error', response.status)
        return
    }
}