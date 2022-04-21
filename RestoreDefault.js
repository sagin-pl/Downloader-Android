import {Animated} from 'react-native'
import {imageGallery} from "./ImageGallery";

export const RestoreDefault = (Animations, States, AppProcessState, VideoURLs, VideoNames, APIResponse, MainButtonBorderLeft, ProgressBarValues, DownloadProgressBarBorderLeft) => {
    AppProcessState = 'main'

    VideoURLs.length = 0
    VideoNames.length = 0
    APIResponse.error = 'none'
    APIResponse.quality = 'none'
    APIResponse.trackURL = 'none'

    Animated.timing(MainButtonBorderLeft, {
        toValue: 0,
        duration: 600,
        useNativeDriver: false
    }).start()

    States.setURL('')
    States.setURLInputDisplay('flex')
    States.setClipboardActiveColor('#eee')
    States.setClipboardActiveState(false)
    States.setIconDownloadDisplay('flex')
    States.setIconCrossDisplay('none')
    States.setDownloadActiveColor('#eee')
    States.setDownloadActiveState(false)
    States.setExternalLinkActiveColor('#bbb')
    States.setExternalLinkActiveState(true)

    setTimeout(function(){
        States.setCancelButtonDisplay('none')
        States.setPreviewDisplay('none')
        States.setPreviewVideoDisplay('none')
        States.setPreviewGalleryDisplay('none')
        States.setQualityDisplay('none')
        States.setExternalLinkDisplay('none')
    }, 800)

    Animations.MainContentFadeIn.start()
    Animations.URLInputFadeIn.start()
    Animations.CancelButtonFadeOut.start()
    Animations.MainButtonBorderBottomExtend.start()
    Animations.MainButtonBorderTopShrink.start()
    Animations.MainButtonBorderLeftShrink.start()
    Animations.PreviewConHeightShrink.start()
    Animations.NavBorderTopShrink.start()
    Animations.QualityFadeOut.start()
    Animations.ExternalLinkFadeOut.start()
    Animations.PreviewGalleryFadeOut.start()
    Animations.PreviewVideoFadeOut.start()

    imageGallery.length = 0
}