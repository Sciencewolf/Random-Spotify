import {FastAverageColor} from "fast-average-color";

function setBackgroundColor(props: {link: string}) {
    const fac = new FastAverageColor()
    const body = document.querySelector('body')!
    const footer = document.querySelector('footer *') as HTMLElement
    const footer_a = document.querySelector('#dev a') as HTMLLinkElement
    const img_volume_icon = document.getElementById('img-volume') as HTMLImageElement
    const img_volume_icon_dark: string = 'https://img.icons8.com/ios-glyphs/30/medium-volume.png'
    const img_volume_icon_light: string = 'https://img.icons8.com/ios-glyphs/30/FFFFFF/medium-volume.png'
    const theme_color = document.getElementById('meta-theme') as HTMLMetaElement

    fac.getColorAsync(props.link)
        .then(color => {
            body.style.backgroundColor = color.rgb
            footer.style.color = color.isDark ? '#fff' : '#000'
            footer_a.style.color = color.isDark ? '#fff' : '#000'
            img_volume_icon.src = color.isDark ? img_volume_icon_light : img_volume_icon_dark
            theme_color.content = color.rgb
        })
        .catch(err => console.log(err))

    return (
        <></>
    )
}

export default setBackgroundColor