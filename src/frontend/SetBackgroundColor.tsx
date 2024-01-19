import {FastAverageColor} from "fast-average-color";

function setBackgroundColor(props: {link: string}) {
    const fac = new FastAverageColor()
    const body = document.querySelector('body')!
    const skeleton = document.querySelector('.skeleton-div') as HTMLDivElement
    const footer = document.querySelector('footer *') as HTMLElement
    const theme_color = document.getElementById('meta-theme') as HTMLMetaElement

    fac.getColorAsync(props.link)
        .then(color => {
            body.style.backgroundColor = color.rgb
            skeleton.style.backgroundColor = color.isDark ? '#fff' : '#4d4d4d'
            skeleton.style.color = color.isDark ? '#000' : '#fff'
            footer.style.color = color.isDark ? '#fff' : '#000'
            theme_color.content = color.rgb
        })
        .catch(err => console.log(err))

    return (
        <></>
    )
}

export default setBackgroundColor