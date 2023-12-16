type Props = {
    userIcon: string,
    userName: string
}

function updateLoginButton({ userIcon, userName }: Props) {
    const loginDiv = document.getElementById('login')

    const button = document.createElement('button')
    button.type = "button"
    button.onclick = () => {
        window.localStorage.removeItem('token')
        window.location.href = "http://localhost:5173"
    }
    button.innerHTML = 'Logout'
    button.id = "logout"
    button.className = 'logout'

    // @ts-ignore
    loginDiv.innerHTML = `
        <img src=${userIcon} alt="user-icon" id="user-icon"/>
                <h3 className="user-name" id="user-name">
                    ${userName}
                </h3>
    `

    // @ts-ignore
    const loginDivInnerHTML = loginDiv.innerHTML

    // @ts-ignore
    loginDiv.style.cssText = "width: 200px;gap: 1em;padding: 5px 5px"
    // @ts-ignore
    loginDiv.addEventListener('mouseover', () => {
        // @ts-ignore
        loginDiv.innerHTML = ""
        // @ts-ignore
        loginDiv.appendChild(button)
    })

    // @ts-ignore
    loginDiv.addEventListener('mouseout', () => {
        // @ts-ignore
        loginDiv.innerHTML = loginDivInnerHTML
    })

    return (
        <>
        </>
    )
}

export default updateLoginButton;