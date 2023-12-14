type Props = {
    userIcon: string,
    userName: string
}

function updateLoginButton({ userIcon, userName }: Props) {
    const loginDiv = document.getElementById('login')
    // @ts-ignore
    loginDiv.innerHTML = `
    <img src=${userIcon} alt="user-icon" id="user-icon"/>
            <h3 className="user-name" id="user-name">
                ${userName}
            </h3>
    `

    // @ts-ignore
    loginDiv.style.cssText = "width: 200px;gap: 1em;padding: 5px 5px"

    return (
        <>
        </>
    )
}

export default updateLoginButton;