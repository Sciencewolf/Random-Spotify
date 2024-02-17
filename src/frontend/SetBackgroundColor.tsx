import {FastAverageColor} from "fast-average-color";

function setBackgroundColor(props: {link: string}) {
    const fac = new FastAverageColor()
    const body = document.querySelector('body')!
    const footer = document.querySelector('footer *') as HTMLElement
    const footer_a = document.querySelector('#dev a') as HTMLLinkElement
    const img_volume_icon = document.getElementById('img-volume') as HTMLImageElement
    const img_share_icon = document.getElementById('img-share') as HTMLImageElement
    const theme_color = document.getElementById('meta-theme') as HTMLMetaElement
    const h2 = document.querySelectorAll('h2')!
    const p = document.querySelectorAll('p')!

    const img_volume_icon_dark: string = 'https://img.icons8.com/ios-glyphs/30/medium-volume.png'
    const img_volume_icon_light: string = 'https://img.icons8.com/ios-glyphs/30/FFFFFF/medium-volume.png'

    const img_share_icon_light: string = 'https://img.icons8.com/ios-glyphs/30/FFFFFF/share-rounded.png'
    const img_share_icon_dark: string = 'https://img.icons8.com/ios-glyphs/30/000000/share-rounded.png'

    fac.getColorAsync(props.link)
        .then(color => {
            body.style.backgroundColor = color.rgb
            if(color.isDark) {
                footer.style.color = '#fff'
                footer_a.style.color = '#fff'
                h2.forEach((item) => {
                    item.style.color = '#fff'
                })
                p.forEach((item) => {
                    item.style.color = '#fff'
                })
                img_volume_icon.src = img_volume_icon_light
                img_volume_icon.alt = 'volume-icon unmute light'
                img_share_icon.src = img_share_icon_light
            }
            else if(color.isLight){
                footer.style.color = '#000'
                footer_a.style.color = '#000'
                h2.forEach((item) => {
                    item.style.color = '#000'
                })
                p.forEach((item) => {
                    item.style.color = '#000'
                })
                img_volume_icon.src = img_volume_icon_dark
                img_volume_icon.alt = 'volume-img unmute dark'
                img_share_icon.src = img_share_icon_dark
            }
            theme_color.content = color.rgb
        })
        .catch(err => console.log(err))

    return (
        <></>
    )
}

export default setBackgroundColor