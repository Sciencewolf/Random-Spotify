async function play() {
    const maxRetries = 3; // Set a maximum number of retries
    let retryCount = 0;

    const tracks: string[] = ["spotify:track:3vefdW0Zsk57Qn0qxXeVCI"];

    while (retryCount < maxRetries) {
        try {
            const response = await fetch('https://api.spotify.com/v1/me/player/play', {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`
                },
                method: 'PUT',
                body: JSON.stringify({"uris": tracks, 'position_ms': 0})
            });

            if (response.ok) {
                break // Success
            } else {
                console.log(`Retry ${retryCount + 1}: ${response.statusText}`);
                retryCount++;
                // Implement exponential backoff - wait for 2^retryCount seconds
                await new Promise(resolve => setTimeout(resolve, (2 ** retryCount) * 1000));
            }
        } catch (err) {
            console.error(`Error during request: ${err}`);
            break;
        }
    }
}

export default play