import '../style/Footer.css'

function footer(props: {isChangeFooterClassName: boolean}) {
    return (
        <>
            <footer className={props.isChangeFooterClassName ? "footer-after" : "footer"}
                    id={"footer"}>
                <span>
                    Developed with <span id={"heart"}>❤️</span> by
                </span>
                <span id={"dev"}>
                    <a href="https://github.com/Sciencewolf" target={"_blank"}>
                        Aron Marton
                    </a>
                </span>
            </footer>
        </>
    )
}

export default footer;