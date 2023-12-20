function isMobileVersion(): boolean {
    return /Android|iPhone/.test(window.navigator.userAgent)
}

export default isMobileVersion;