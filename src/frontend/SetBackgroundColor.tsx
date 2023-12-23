import {FastAverageColor} from "fast-average-color";

function setBackgroundColor(props: {link: string}) {
    const fac = new FastAverageColor()
    const body = document.querySelector('body')
    const footer = document.querySelector('footer *')

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    fac.getColorAsync(props.link).then(color => {body.style.backgroundColor = color.rgb; footer.style.color = color.isDark ? '#fff' : '#000'})
        .catch(err => console.log(err))

    return (
        <></>
    )
}

export default setBackgroundColor