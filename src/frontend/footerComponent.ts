function footerComponent(){
    const footer = document.createElement('footer')
    footer.id = 'footer'
    footer.className = 'footer-after'
    footer.innerHTML = `
                <span>
                    Developed with <span id="heart">❤️</span> by
                </span>
                <span id="dev">
                    <a href="https://github.com/Sciencewolf" target="_blank">
                        Aron Marton
                    </a>
                </span>`

    document.body.appendChild(footer)

}

export default footerComponent