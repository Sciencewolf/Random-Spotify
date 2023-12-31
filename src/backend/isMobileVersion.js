export function isMobileVersion() {
    return /Android|iPhone/.test(window.navigator.userAgent)
}