import {GetRandomInt, Sleep} from './VoidTools'
import {Animated, ToastAndroid} from 'react-native'
import {res} from './style'

export const DownloadManager = async (URL, Animations, States, AppProcessState, VideoURLs, VideoNames, APIResponse, MainButtonBorderLeft) => {
    if(URL==='' || URL===null) {
        ToastAndroid.show('Wprowadź URL', 2)
        return
    }

    States.setIconDownloadDisplay('none')
    States.setIconCrossDisplay('flex')

    States.setClipboardActiveColor('#bbb')
    States.setClipboardActiveState(true)
    AppProcessState = 'convert'

    let Availability = await DownloadCheckAvailability(URL, APIResponse, States)
    if(!Availability && AppProcessState==='convert') {
        let Quality = 'hd'
        if(!(URL).includes('pornhub')) {
            States.setQualityDisplay('flex')
            Animations.QualityFadeIn.start()
            while (APIResponse.quality === 'none') {
                await Sleep(100)
            }
            Animations.QualityFadeOut.start()
        }

        Availability = await DownloadCheckAvailability(URL, APIResponse, States, Quality)
    }
    if (Availability && AppProcessState==='convert') {
        const isURLCorrect = await DownloadValidateURL(APIResponse)
        if (isURLCorrect && APIResponse.trackURL !== 'none' && AppProcessState==='convert') {
            DownloadStartAnim(Animations)
            const ProgressFilled = await DownloadSetProgress(MainButtonBorderLeft, APIResponse, AppProcessState, VideoURLs, VideoNames)
            if (ProgressFilled && APIResponse.error === 'none' && AppProcessState==='convert') {
                AppProcessState = 'download'
                States.setExternalLinkActiveState(false)
                States.setExternalLinkActiveColor('#eee')

                States.setIconDownloadDisplay('flex')
                States.setIconCrossDisplay('none')

                DownloadEndAnim(Animations, States)
            } else {
                ToastAndroid.show('Pobierany plik jest przestarzały, spróbuj ponownie', 2)
                //CANCEL FORM
            }
        } else {
            ToastAndroid.show('Niepoprawny URL', 2)
            //CANCEL FORM
        }
    } else {
        ToastAndroid.show('API nie wyrabia, spróbuj ponownie później', 2)
        //CANCEL FORM
    }

    console.log(VideoURLs)
}

const DownloadCheckAvailability = async (URL, APIResponse, States, Quality) => {
    let success = false

    if(Quality===undefined) {
        await fetch('https://api.sagin.pl/szurag', {
            body: JSON.stringify({
                'url': URL
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "POST"
        }).then(response => response.json())
            .then(response => {
                if (response.Mordo === undefined && response.url !== undefined) {
                    APIResponse.trackURL = response.url
                    success = true
                }
            })
    } else {
        await fetch('https://api.sagin.pl/szuragV2', {
            body: JSON.stringify({
                'settings': Quality,
                'url': URL
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "POST"
        }).then(response => response.json())
            .then(response => {
                if (response.Mordo === undefined && response.url !== undefined) {
                    APIResponse.trackURL = response.url
                    success = true
                }
            })
    }

    return success
}

const DownloadValidateURL = async (APIResponse) => {
    let success = false
    await fetch(APIResponse.trackURL)
        .then(response => response.json())
        .then(response => {
            if(response.detail===undefined && response.Mordo===undefined && Object.values(response)[0]!=='Bad URL, uuid is good' && Object.values(response)[0]!=='UUID not found') {
                success = true
            } else {
                if(response.detail!==undefined)
                    APIResponse.error = response.detail
            }
        })

    return success
}

const DownloadStartAnim = (Animations) => {
    Animations.URLInputFadeOut.start()
    Animations.MainButtonBorderBottomShrink.start()
}

const DownloadSetProgress = async (MainButtonBorderLeft, APIResponse, AppProcessState, VideoURLs, VideoNames) => {
    let Progress = 0, success = true
    while (Progress < 100) {
        await fetch(APIResponse.trackURL)
            .then(response => {
                if (!response.ok) {
                    success = false
                    return response.text().then(text => {
                        console.log('API ERROR: ', text)
                    })
                } else
                    return response.json()
                })
            .catch(err => {
                success = false
                console.log('FETCH ERROR: ', err)
            })
            .then(response => {
                if (response.detail === undefined) {
                    if (typeof Object.values(response)[0] === 'number') {
                        let temp
                        if (Object.values(response)[0] === 0)
                            temp = res.vw * 0.8 / 95
                        else {
                            if (Progress - Object.values(response)[0] < 20) {
                                let rand = GetRandomInt(5)
                                Progress = Progress + rand + 3
                            } else {
                                if (Object.values(response)[0]%10===0 && Object.values(response)[0] > Progress)
                                    Progress = Object.values(res)[0]
                            }

                            temp = 100 / Progress
                            temp = res.vw * 0.8 / temp
                        }

                        if (AppProcessState==='convert') {
                            Animated.timing(MainButtonBorderLeft, {
                                toValue: parseInt(temp, 10),
                                duration: 600,
                                useNativeDriver: false
                            }).start()
                        }
                    } else if (AppProcessState==='convert') {
                        let i = 0
                        while (Object.values(response)[0][i] !== undefined) {
                            if (Object.values(response)[0][i].length<=1) {
                                VideoURLs.push(Object.values(response)[0])
                                VideoNames.push(Object.values(response)[0].substring(23))
                                break;
                            } else {
                                VideoURLs.push(Object.values(response)[0][i])
                                VideoNames.push(Object.values(response)[0][i].substring(23))
                            }

                            i++
                        }

                        Progress = 100
                        let temp = res.vw * 0.8
                        Animated.timing(MainButtonBorderLeft, {
                            toValue: parseInt(temp, 10),
                            duration: 600,
                            useNativeDriver: false
                        }).start()
                    }
                } else {
                    APIResponse.error = response.detail
                    success = false
                }
            })

        await Sleep(1000)
    }

    return success
}

const DownloadEndAnim = (Animations, States) => {
    States.setPreviewDisplay('flex')
    States.setURLInputDisplay('none')
    States.setCancelButtonDisplay('flex')

    Animations.MainButtonBorderTopExtend.start()
    Animations.MainButtonBorderLeftShrink.start()

    setTimeout(function(){ Animations.CancelButtonFadeIn.start() }, 1800)

    setTimeout(async function (){
        await Animations.MainButtonBorderTopShrink.start()
        await Sleep(600)

        Animations.MainButtonBorderBottomExtend.start()
        Animations.NavBorderTopExtend.start()
        await Sleep(400)

        Animations.PreviewConHeightExtend.start()
    }, 200)
}