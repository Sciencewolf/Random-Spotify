import '../style/Footer.css'

function footer() {
    const date = new Date()
    return (
        <>
            <footer className={"footer"}
                    id={"footer"}>
                <span>Created by: Aron Marton
                    <a href="https://github.com/Sciencewolf">
                        [GitHub]
                    </a>
                    {date.getFullYear()}
                </span>
                |
                <span>Icon's from
                    <a href="https://icons8.com">
                        [Icons8]
                    </a>
                </span>
            </footer>
        </>
    )
}

export default footer;