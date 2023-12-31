import {FastAverageColor} from "fast-average-color";

function setBackgroundColor(props: {link: string}) {
    const fac = new FastAverageColor()
    const body = document.querySelector('body')!
    const footer = document.querySelector('footer *') as HTMLElement
    const theme_color = document.getElementById('meta-theme') as HTMLMetaElement

    fac.getColorAsync(props.link)
        .then(color => {
            body.style.backgroundColor = color.rgb
            footer.style.color = color.isDark ? '#fff' : '#000'
            theme_color.content = color.rgb
        })
        .catch(err => console.log(err))

    return (
        <></>
    )
}

export default setBackgroundColor