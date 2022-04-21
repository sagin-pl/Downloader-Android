import AppLoading from 'expo-app-loading'
import {useEffect, useRef, useState} from 'react'
import {Animated, Clipboard, Keyboard, Linking, ToastAndroid} from 'react-native'
import {useFonts, OpenSans_300Light, OpenSans_400Regular} from '@expo-google-fonts/open-sans'

import {
    APINotificationCon,
    APINotificationContentCon,
    APINotificationContentText,
    APINotificationCountdownCon,
    APINotificationCountdownText,
    APINotificationHeader,
    APINotificationHeaderText,
    Background,
    Container,
    ContentCon,
    DownloadButtonsCon,
    DownloadButtonsText,
    DownloadButtonsTextCon,
    DownloadButtonsTouchableCon,
    DownloadProgressBar,
    DownloadProgressBarCon,
    DownloadProgressBarText,
    DownloadProgressBarTopRow,
    MainButtonCon,
    MainCon,
    NavBut,
    NavButRow,
    NavIcon,
    NavMiniMenuCon,
    NavMiniMenuIcon,
    NavMiniMenuIconCon,
    NavMiniMenuRow,
    NavMiniMenuText,
    NavRow, PreviewAV,
    PreviewCon, PreviewGallery,
    res,
    URLInput
} from './style'
import {DownloadFile, ProgressBarValues} from './DownloadingFile'
import {DownloadManager} from './ConvertingPhase'
import {RestoreDefault} from './RestoreDefault'
import {Countdown} from './VoidTools'
import {imageGallery} from "./ImageGallery";

let AppProcessState = 'main'

let VideoURLs = new Array()
let VideoNames = new Array()
let APIResponse = {
    error: 'none',
    quality: 'none',
    trackURL: 'none'
}

export default function App() {
    const MainContentOpac = useRef(new Animated.Value(0)).current

    const URL = useState('')
    const ExitAppCountdown = useState(5)
    const URLInputOpac = useRef(new Animated.Value(1)).current
    const URLInputDisplay = useState('flex')
    const MainButtonBorderBottom = useRef(new Animated.Value(1)).current
    const MainButtonBorderTop = useRef(new Animated.Value(0)).current
    const MainButtonBorderLeft = useRef(new Animated.Value(0)).current
    const CancelButtonOpac = useRef(new Animated.Value(0)).current
    const CancelButtonDisplay = useState('none')

    const PreviewConHeight = useRef(new Animated.Value(0)).current
    const PreviewDisplay = useState('none')
    const PreviewVideoOpac = useRef(new Animated.Value(0)).current
    const PreviewVideoDisplay = useState('none')
    const PreviewVideoZIndex = useState(-1)
    const PreviewGalleyOpac = useRef(new Animated.Value(0)).current
    const PreviewGalleryDisplay = useState('none')
    const PreviewGalleryZIndex = useState(-1)

    const NavBorderTop = useRef(new Animated.Value(0)).current
    const ClipboardActiveColor = useState('#eee')
    const ClipboardActiveDisable = useState(false)
    const IconDownloadDisplay = useState('flex')
    const IconCrossDisplay = useState('none')
    const DownloadActiveColor = useState('#eee')
    const DownloadActiveDisable = useState(false)
    const ExternalLinkActiveColor = useState('#bbb')
    const ExternalLinkActiveDisable = useState(true)

    const QualityOpac = useRef(new Animated.Value(0)).current
    const QualityDisplay = useState('none')
    const ExternalLinkOpac = useRef(new Animated.Value(0)).current
    const ExternalLinkDisplay = useState('none')

    const APIAlertOpac = useRef(new Animated.Value(0)).current
    const APIAlertTop = useRef(new Animated.Value(-1000)).current

    const DownloadProgressBarBorderLeft = useRef(new Animated.Value(1)).current
    const DownloadProgressBarBottom = useRef(new Animated.Value(-200)).current
    const DownloadProgressBarPercentage = useState(0)
    const DownloadProgressBarUnit = useState('%')

    const Animations = {
        MainContentFadeIn: Animated.timing(MainContentOpac, { toValue: 1, duration: 600, useNativeDriver: true }),
        MainContentFadeOut: Animated.timing(MainContentOpac, { toValue: 0, duration: 300, useNativeDriver: true }),

        URLInputFadeIn: Animated.timing(URLInputOpac, { toValue: 1, duration: 400, useNativeDriver: true }),
        URLInputFadeOut: Animated.timing(URLInputOpac, { toValue: 0, duration: 400, useNativeDriver: true }),
        CancelButtonFadeIn: Animated.timing(CancelButtonOpac, { toValue: 1, duration: 400, useNativeDriver: true }),
        CancelButtonFadeOut: Animated.timing(CancelButtonOpac, { toValue: 0, duration: 400, useNativeDriver: true }),
        MainButtonBorderBottomExtend: Animated.timing(MainButtonBorderBottom, { toValue: 1, duration: 400, useNativeDriver: false }),
        MainButtonBorderBottomShrink: Animated.timing(MainButtonBorderBottom, { toValue: 0, duration: 200, useNativeDriver: false }),
        MainButtonBorderTopExtend: Animated.timing(MainButtonBorderTop, { toValue: res.vh/18, duration: 1, useNativeDriver: false }),
        MainButtonBorderTopShrink: Animated.timing(MainButtonBorderTop, { toValue: 0, duration: 600, useNativeDriver: false }),
        MainButtonBorderLeftShrink: Animated.timing(MainButtonBorderLeft, { toValue: 0, duration: 1, useNativeDriver: false }),

        PreviewConHeightExtend: Animated.timing(PreviewConHeight, { toValue: res.vh-300, duration: 400, useNativeDriver: false }),
        PreviewConHeightShrink: Animated.timing(PreviewConHeight, { toValue: 0, duration: 400, useNativeDriver: false }),
        PreviewVideoFadeIn: Animated.timing(PreviewVideoOpac, { toValue: 1, duration: 400, useNativeDriver: true }),
        PreviewVideoFadeOut: Animated.timing(PreviewVideoOpac, { toValue: 0, duration: 400, useNativeDriver: true }),
        PreviewGalleryFadeIn: Animated.timing(PreviewGalleyOpac, { toValue: 1, duration: 400, useNativeDriver: true }),
        PreviewGalleryFadeOut: Animated.timing(QualityOpac, { toValue: 0, duration: 400, useNativeDriver: true }),

        NavBorderTopExtend: Animated.timing(NavBorderTop, { toValue: 1, duration: 400, useNativeDriver: false }),
        NavBorderTopShrink: Animated.timing(NavBorderTop, { toValue: 0, duration: 400, useNativeDriver: false }),

        QualityFadeIn: Animated.timing(QualityOpac, { toValue: 1, duration: 400, useNativeDriver: true }),
        QualityFadeOut: Animated.timing(QualityOpac, { toValue: 0, duration: 400, useNativeDriver: true }),
        ExternalLinkFadeIn: Animated.timing(ExternalLinkOpac, { toValue: 1, duration: 400, useNativeDriver: true }),
        ExternalLinkFadeOut: Animated.timing(ExternalLinkOpac, { toValue: 0, duration: 400, useNativeDriver: true }),

        APIAlertFadeIn: Animated.timing(APIAlertOpac, { toValue: 1, duration: 300, useNativeDriver: false }),
        APIAlertFadeOut: Animated.timing(APIAlertOpac, { toValue: 0, duration: 300, useNativeDriver: false }),
        APIAlertBottomIn: Animated.timing(APIAlertTop, { toValue: res.vh/2.5, duration: 1, useNativeDriver: false }),

        DownloadProgressBarBottomIn: Animated.timing(DownloadProgressBarBottom, { toValue: 0, duration: 600, useNativeDriver: false }),
        DownloadProgressBarBottomOut: Animated.timing(DownloadProgressBarBottom, { toValue: -150, duration: 600, useNativeDriver: false }),
    }

    const States = {
        URL: URL[0],
        setURL: URL[1],
        ExitAppCountdown: ExitAppCountdown[0],
        setExitAppCountdown: ExitAppCountdown[1],

        URLInputDisplay: URLInputDisplay[0],
        setURLInputDisplay: URLInputDisplay[1],
        CancelButtonDisplay: CancelButtonDisplay[0],
        setCancelButtonDisplay: CancelButtonDisplay[1],
        
        PreviewDisplay: PreviewDisplay[0],
        setPreviewDisplay: PreviewDisplay[1],
        PreviewVideoDisplay: PreviewVideoDisplay[0],
        setPreviewVideoDisplay: PreviewVideoDisplay[1],
        PreviewVideoZIndex: PreviewVideoZIndex[0],
        setPreviewVideoZIndex: PreviewVideoZIndex[1],
        PreviewGalleryDisplay: PreviewGalleryDisplay[0],
        setPreviewGalleryDisplay: PreviewGalleryDisplay[1],
        PreviewGalleryZIndex: PreviewGalleryZIndex[0],
        setPreviewGalleryZIndex: PreviewGalleryZIndex[1],
        
        ClipboardActiveColor: ClipboardActiveColor[0],
        setClipboardActiveColor: ClipboardActiveColor[1],
        ClipboardActiveState: ClipboardActiveDisable[0],
        setClipboardActiveState: ClipboardActiveDisable[1],
        IconDownloadDisplay: IconDownloadDisplay[0],
        setIconDownloadDisplay: IconDownloadDisplay[1],
        IconCrossDisplay: IconCrossDisplay[0],
        setIconCrossDisplay: IconCrossDisplay[1],
        DownloadActiveColor: DownloadActiveColor[0],
        setDownloadActiveColor: DownloadActiveColor[1],
        DownloadActiveState: DownloadActiveDisable[0],
        setDownloadActiveState: DownloadActiveDisable[1],
        ExternalLinkActiveColor: ExternalLinkActiveColor[0],
        setExternalLinkActiveColor: ExternalLinkActiveColor[1],
        ExternalLinkActiveState: ExternalLinkActiveDisable[0],
        setExternalLinkActiveState: ExternalLinkActiveDisable[1],

        QualityDisplay: QualityDisplay[0],
        setQualityDisplay: QualityDisplay[1],
        ExternalLinkDisplay: ExternalLinkDisplay[0],
        setExternalLinkDisplay: ExternalLinkDisplay[1],

        DownloadProgressBarPercentage: DownloadProgressBarPercentage[0],
        setDownloadProgressBarPercentage: DownloadProgressBarPercentage[1],
        DownloadProgressBarUnit: DownloadProgressBarUnit[0],
        setDownloadProgressBarUnit: DownloadProgressBarUnit[1]
    }

    useEffect(() => {
        Animations.MainContentFadeIn.start()

        fetch('https://api.sagin.pl/v1')
            .then(response => {
                if (!response.ok) {
                    Countdown(States, 5)
                    Animations.MainContentFadeOut.start()
                    setTimeout(function(){
                        Animations.APIAlertBottomIn.start()
                        Animations.APIAlertFadeIn.start()
                    }, 250)
                    return response.text().then(text => {
                        console.log('API ERROR: ', text)
                    })
                } else {
                    return response.json()
                }
            })
            .catch(err => {
                Countdown(States, 5)
                Animations.MainContentFadeOut.start()
                setTimeout(function(){
                    Animations.APIAlertBottomIn.start()
                    Animations.APIAlertFadeIn.start()
                }, 250)
                console.log('FETCH ERROR: ', err)
            })
    }, [])

    let [fontsLoaded] = useFonts({
        OpenSans_300Light,
        OpenSans_400Regular
    })
    if (!fontsLoaded) {
        return <AppLoading />
    } else {
        return (
            <Container>
                <Background source={require('./assets/bg.png')}/>
                <ContentCon style={[{opacity: MainContentOpac}]}>
                    <MainCon>
                        <MainButtonCon style={[{borderBottomWidth: MainButtonBorderBottom, borderTopWidth: MainButtonBorderTop, borderLeftWidth: MainButtonBorderLeft}]}>
                            <URLInput
                                value={States.URL}
                                placeholder='Wprowadź URL'
                                placeholderTextColor='#fff'
                                onChangeText={(url) => States.setURL(url)}
                                style={[{fontFamily: 'OpenSans_400Regular', opacity: URLInputOpac, display: States.URLInputDisplay}]}
                            />
                            <DownloadButtonsCon style={[{opacity: CancelButtonOpac, display: States.CancelButtonDisplay}]}>
                                <DownloadButtonsTouchableCon>
                                    <DownloadButtonsTextCon onPress={() => RestoreDefault(Animations, States, AppProcessState, VideoURLs, VideoNames, APIResponse, MainButtonBorderLeft, ProgressBarValues, DownloadProgressBarBorderLeft)}>
                                        <DownloadButtonsText>Wyczyść</DownloadButtonsText>
                                    </DownloadButtonsTextCon>
                                </DownloadButtonsTouchableCon>
                            </DownloadButtonsCon>
                        </MainButtonCon>
                        <PreviewCon style={[{display: States.PreviewDisplay, height: PreviewConHeight}]}>
                            <PreviewAV
                                source={{uri: VideoURLs[0]}}
                                resizeMode='contain'
                                useNativeControls={true}
                                style={[{display: States.PreviewVideoDisplay, opacity: PreviewVideoOpac, zIndex: States.PreviewVideoZIndex}]}
                            />
                            <PreviewGallery
                                images={imageGallery}
                                style={[{display: States.PreviewGalleryDisplay, opacity: PreviewGalleyOpac, zIndex: States.PreviewGalleryZIndex}]}
                            />
                        </PreviewCon>
                        <NavRow style={[{borderTopWidth: NavBorderTop}]}>
                            <NavButRow>
                                <NavBut style={[{borderColor: States.ClipboardActiveColor}]} disabled={States.ClipboardActiveState} onPress={() => ActionManager('clipboard', Animations, States, MainButtonBorderLeft, DownloadProgressBarBorderLeft)}>
                                    <NavIcon name='clipboard' size={25} style={[{color: States.ClipboardActiveColor}]}/>
                                </NavBut>
                                <NavBut style={[{width: 70, borderColor: States.DownloadActiveColor}]} disabled={States.DownloadActiveState} onPress={() => ActionManager('convert', Animations, States, MainButtonBorderLeft, DownloadProgressBarBorderLeft)}>
                                    <NavIcon name='download' color='#eee' size={25} style={[{display: States.IconDownloadDisplay, marginTop: 5, color: States.DownloadActiveColor}]}/>
                                    <NavIcon name='x' color='#eee' size={25} style={[{display: States.IconCrossDisplay, marginTop: 5, color: States.DownloadActiveColor}]}/>
                                </NavBut>
                                <NavBut style={[{borderColor: States.ExternalLinkActiveColor}]} disabled={States.ExternalLinkActiveState} onPress={() => ActionManager('externallink', Animations, States, MainButtonBorderLeft, DownloadProgressBarBorderLeft)}>
                                    <NavIcon name='external-link' size={25} style={[{color: States.ExternalLinkActiveColor}]}/>
                                </NavBut>
                            </NavButRow>
                        </NavRow>
                    </MainCon>
                    <NavMiniMenuCon style={[{opacity: QualityOpac, display: States.QualityDisplay}]}>
                        <NavMiniMenuText>Wybierz jakość</NavMiniMenuText>
                        <NavMiniMenuRow>
                            <NavMiniMenuIconCon onPress={() => APIResponse.quality = 'best'}>
                                <NavMiniMenuIcon name='hd' color='#eee'/>
                            </NavMiniMenuIconCon>
                            <NavMiniMenuIconCon onPress={() => APIResponse.quality = 'hd'}>
                                <NavMiniMenuIcon name='sd' color='#eee'/>
                            </NavMiniMenuIconCon>
                        </NavMiniMenuRow>
                    </NavMiniMenuCon>
                    <NavMiniMenuCon style={[{opacity: ExternalLinkOpac, display: States.ExternalLinkDisplay}]}>
                        <NavMiniMenuText>Eksportuj Link</NavMiniMenuText>
                        <NavMiniMenuRow>
                            <NavMiniMenuIconCon onPress={() => {Clipboard.setString(VideoURLs[0]); ToastAndroid.show('Skopiowano', 2); Animations.ExternalLinkFadeOut.start(); setTimeout(function(){ States.setExternalLinkDisplay('none') }, 600)}}>
                                <NavMiniMenuIcon name='content-copy' color='#eee'/>
                            </NavMiniMenuIconCon>
                            <NavMiniMenuIconCon onPress={() => {Linking.canOpenURL(VideoURLs[0]).then(canOpen => {if(canOpen) Linking.openURL(VideoURLs[0])}); Animations.ExternalLinkFadeOut.start(); setTimeout(function(){ States.setExternalLinkDisplay('none') }, 600)}}>
                                <NavMiniMenuIcon name='open-in-browser' color='#eee'/>
                            </NavMiniMenuIconCon>
                        </NavMiniMenuRow>
                    </NavMiniMenuCon>
                </ContentCon>
                <APINotificationCon style={[{opacity: APIAlertOpac, top: APIAlertTop}]}>
                    <APINotificationHeader>
                        <APINotificationHeaderText style={[{fontFamily: 'OpenSans_300Light'}]}>ALERT</APINotificationHeaderText>
                    </APINotificationHeader>
                    <APINotificationContentCon>
                        <APINotificationContentText style={[{fontFamily: 'OpenSans_400Regular'}]}>Nie można połączyć z serwerem API, spróbuj ponownie później</APINotificationContentText>
                        <APINotificationCountdownCon>
                            <APINotificationCountdownText style={[{fontFamily: 'OpenSans_400Regular'}]}>Aplikacja wyłączy się za {States.ExitAppCountdown}</APINotificationCountdownText>
                        </APINotificationCountdownCon>
                    </APINotificationContentCon>
                </APINotificationCon>
                <DownloadProgressBarCon style={[{bottom: DownloadProgressBarBottom}]}>
                    <DownloadProgressBarTopRow>
                        <DownloadProgressBarText>{States.DownloadProgressBarPercentage}{States.DownloadProgressBarUnit}</DownloadProgressBarText>
                    </DownloadProgressBarTopRow>
                    <DownloadProgressBar style={[{borderLeftWidth: DownloadProgressBarBorderLeft}]}></DownloadProgressBar>
                </DownloadProgressBarCon>
            </Container>
        )
    }
}

const ActionManager = async (Type, Animations, States, MainButtonBorderLeft, DownloadProgressBarBorderLeft) => {
    Keyboard.dismiss()
    switch (Type) {
        case 'convert':
            if (States.IconDownloadDisplay==='flex' && States.PreviewDisplay==='none') {
                await DownloadManager(States.URL, Animations, States, AppProcessState, VideoURLs, VideoNames, APIResponse, MainButtonBorderLeft, DownloadProgressBarBorderLeft)
            } else if (States.IconDownloadDisplay==='flex' && States.PreviewDisplay==='flex') {
                await DownloadFile(States, Animations, VideoURLs, VideoNames, DownloadProgressBarBorderLeft)
            } else if (States.IconCrossDisplay==='flex') {
                RestoreDefault(Animations, States, AppProcessState, VideoURLs, VideoNames, APIResponse, MainButtonBorderLeft, ProgressBarValues, DownloadProgressBarBorderLeft)
            }
            break;

        case 'clipboard':
            States.setIconDownloadDisplay('none')
            States.setIconCrossDisplay('flex')

            let text = await Clipboard.getString()
            States.setURL(text)
            await DownloadManager(text, Animations, States, AppProcessState, VideoURLs, VideoNames, APIResponse, MainButtonBorderLeft, DownloadProgressBarBorderLeft)
            break;

        case 'externallink':
            if(VideoURLs.length>1) {
                ToastAndroid.show('Nie da się, unlucky nie?', 2)
            } else {
                States.setExternalLinkDisplay('flex')
                Animations.ExternalLinkFadeIn.start()
            }
            break;
    }
}