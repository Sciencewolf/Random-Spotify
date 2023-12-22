import {Props} from "../backend/Props.ts";

function updateTitle({title}: Props) {
    const titleElem: HTMLElement | null = document.getElementById('title')

    // @ts-ignore
    title !== undefined ? titleElem.innerHTML = title : titleElem.innerHTML = 'Random Spotify'

    return (
        <>
        </>
    )
}

export default updateTitle;