async function volumeComponent(player: Spotify.Player, volumeMuteIconDark: string, volumeMuteIconLight: string, volumeUnmuteIconDark: string, volumeUnmuteIconLight: string){
    let previousValue: number = 0

    const divVolume = document.createElement('div')
    divVolume.id = 'div-volume'
    divVolume.className = 'div-volume'
    divVolume.style.cssText = 'display: flex; justify-content: center; align-items: center;'

    const imgVolumeIcon = document.createElement('img')
    imgVolumeIcon.id = 'img-volume'
    imgVolumeIcon.src = 'https://img.icons8.com/ios-glyphs/30/medium-volume.png'
    imgVolumeIcon.alt = 'volume-icon unmute'

    const volumeInput = document.createElement('input')
    volumeInput.className = 'volume-input'
    volumeInput.id = 'volume-input'
    volumeInput.type = 'range'
    volumeInput.tabIndex = -1
    volumeInput.value = String(await player.getVolume() * 100)
    volumeInput.max = '100'
    volumeInput.min = '0'
    volumeInput.step = '1'

    // good
    imgVolumeIcon.addEventListener('click', () => {
        if(imgVolumeIcon.alt.includes('unmute')){
            if(imgVolumeIcon.alt.includes('dark')){
                imgVolumeIcon.src = volumeMuteIconLight
                imgVolumeIcon.alt = 'volume-icon mute dark'
            }
            else if(imgVolumeIcon.alt.includes('light')){
                imgVolumeIcon.src = volumeMuteIconDark
                imgVolumeIcon.alt = 'volume-icon mute light'
            }

            previousValue = +volumeInput.value / 100
            player.setVolume(0)
            volumeInput.value = '0'
        }else if(imgVolumeIcon.alt.includes('mute')){
            if(imgVolumeIcon.alt.includes('dark')){
                imgVolumeIcon.src = volumeUnmuteIconLight
                imgVolumeIcon.alt = 'volume-icon unmute dark'
            }
            else if(imgVolumeIcon.alt.includes('light')){
                imgVolumeIcon.src = volumeUnmuteIconDark
                imgVolumeIcon.alt = 'volume-icon unmute light'
            }

            player.setVolume(previousValue)
            volumeInput.value = (previousValue * 100).toString()
        }
    })

    // TODO: implement icon feature on input
    volumeInput.addEventListener('input', () => {
        player.setVolume(+volumeInput.value / 100)
        volumeInput.blur()
    })

    divVolume.appendChild(imgVolumeIcon)
    divVolume.appendChild(volumeInput)
    document.body.appendChild(divVolume)
}

export default volumeComponent