import playlistSongs from "./PlaylistSongs.ts";

async function play(preview?: boolean, track?: string) {
    const maxRetries = 3;
    let retryCount = 0;

    const playRequest = async (uris: string[]) => {
        try {
            const response = await fetch('https://api.spotify.com/v1/me/player/play', {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`
                },
                method: 'PUT',
                body: JSON.stringify({ "uris": uris, 'position_ms': 0 })
            });

            if (response.ok) {
                return true; // Success
            } else {
                console.log(`Retry ${retryCount + 1}: ${response.statusText}`);
                retryCount++;
                await new Promise(resolve => setTimeout(resolve, (2 ** retryCount) * 1000));
                return false;
            }
        } catch (err) {
            console.error(`Error during request: ${err}`);
            return false;
        }
    };

    if (preview) {
        while (retryCount < maxRetries) {
            if (await playRequest(['spotify:track:' + track ?? ''])) {
                break;
            }
        }
    } else {
        const { items } = await playlistSongs(10);

        while (retryCount < maxRetries) {
            if (await playRequest(items)) {
                break;
            }
        }
    }
}

export default play;
