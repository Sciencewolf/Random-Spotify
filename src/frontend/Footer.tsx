import '../style/Footer.css'

function footer() {
    const date = new Date()
    return (
        <>
            <span className={"span-footer"} id={"span-footer"}>
                <span>Created by: Aron Marton <a href="https://github.com/Sciencewolf">[GitHub]</a> {date.getFullYear()}</span>
                |
                <span>Icon's from <a href="https://icons8.com">[Icons8]</a> </span>
            </span>
        </>
    )
}

export default footer;