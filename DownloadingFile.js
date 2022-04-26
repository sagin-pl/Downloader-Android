import {ToastAndroid, Animated} from 'react-native'

import * as MediaLibrary from 'expo-media-library'
import * as FileSystem from 'expo-file-system'
import * as Permissions from 'expo-permissions'

import {res} from './style'

export let ProgressBarValues = {
    Shown: 0,
    Written: 0,
    ExpectedToWrite: 0
}

let ItemsInQueue = 0

export const DownloadFile = async (States, Animations, VideoURLs, VideoNames, DownloadProgressBarBorderLeft, APIResponse) => {
    if(ItemsInQueue>0) {
        ToastAndroid.show('Poczekaj, aż poprzedni plik się pobierze', 2)
        return
    } else {
        ProgressBarValues.Shown = 0
        ProgressBarValues.Written = 0
        ProgressBarValues.ExpectedToWrite = 0

        await Animations.DownloadProgressBarBottomOut.start()
        await Animated.timing(DownloadProgressBarBorderLeft, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false
        }).start()
    }

    ToastAndroid.show('Pobieranie rozpoczęte', 2)
    DownloadButtonState('off', States)

    for(let i = 0; i<VideoURLs.length; i++) {
        const url = VideoURLs[i]
        let FileUri = FileSystem.documentDirectory + VideoNames[i]

        ProgressBarValues.ExpectedToWrite = APIResponse.size

        if(ProgressBarValues.ExpectedToWrite < 2500 && ProgressBarValues.ExpectedToWrite!==0) {
            ToastAndroid.show('Pobierany plik jest przestarzały, spróbuj ponownie', 2)
            RestoreProgressBar(Animations, DownloadProgressBarBorderLeft)
            DownloadButtonState('on', States)
            return
        } else {
            ItemsInQueue = ItemsInQueue + 1
            FileSystem.downloadAsync(url, FileUri)
                .then(({uri}) => {
                    RestoreProgressBar(Animations, DownloadProgressBarBorderLeft)
                    DownloadButtonState('on', States)
                    saveFile(uri)
                })
                .catch(error => {
                    RestoreProgressBar(Animations, DownloadProgressBarBorderLeft)
                    DownloadButtonState('on', States)
                    ToastAndroid.show(error, 2)
                    console.log(error)
                })
        }

        await UpdateBytesWritten(FileUri, 0)
    }
    ProgressBarValues.Shown = 1
    Animations.DownloadProgressBarBottomIn.start()
    UpdateDownloadProgressBar(States, Animations, DownloadProgressBarBorderLeft)
}

const UpdateDownloadProgressBar = (States, Animations, DownloadProgressBarBorderLeft) => {
    if(ProgressBarValues.Shown===0) return

    if(ProgressBarValues.ExpectedToWrite===0 || typeof ProgressBarValues.ExpectedToWrite !== 'number' || ProgressBarValues.Written === undefined || typeof ProgressBarValues.Written !== 'number' || ProgressBarValues.Written>ProgressBarValues.ExpectedToWrite) {
        let progress = ProgressBarValues.Written/1000000

        if(typeof progress === 'number') {
            States.setDownloadProgressBarPercentage(progress.toFixed(2))
        } else {
            States.setDownloadProgressBarPercentage(0)
        }

        States.setDownloadProgressBarUnit('MB')
    } else {
        let progress = (ProgressBarValues.Written/ProgressBarValues.ExpectedToWrite)*100
        States.setDownloadProgressBarPercentage(progress.toFixed(2))
        States.setDownloadProgressBarUnit('%')
        Animated.timing(DownloadProgressBarBorderLeft, {
            toValue: ((res.vw * 0.8) * (progress / 100).toFixed(2))+1,
            duration: 200,
            useNativeDriver: false
        }).start()
    }

    if(ProgressBarValues.ExpectedToWrite!==ProgressBarValues.Written || ProgressBarValues.ExpectedToWrite!==ProgressBarValues.Written+1 || ProgressBarValues.Shown===1) {
        setTimeout(function(){ UpdateDownloadProgressBar(States, Animations, DownloadProgressBarBorderLeft) }, 200)
    }
}

const UpdateBytesWritten = async (FileUri) => {
    const { size } = await FileSystem.getInfoAsync(FileUri)

    if(typeof size === 'number') {
        ProgressBarValues.Written = size
    } else {
        ProgressBarValues.Written = 0
    }

    setTimeout(function(){UpdateBytesWritten(FileUri)}, 200)
}

const saveFile = async (fileUri) => {
    ItemsInQueue = ItemsInQueue-1

    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY)
    if (status === "granted") {
        const asset = await MediaLibrary.createAssetAsync(fileUri)
        await MediaLibrary.createAlbumAsync('SaginDownloader', asset, false)
        ToastAndroid.show('Plik został zapisany', 1)
    }
}

const DownloadButtonState = (Type, States) => {
    switch(Type) {
        case 'on':
            States.setDownloadActiveState(false)
            States.setDownloadActiveColor('#eee')
            break;

        case 'off':
            States.setDownloadActiveState(true)
            States.setDownloadActiveColor('#bbb')
            break;
    }
}

const RestoreProgressBar = (Animations, DownloadProgressBarBorderLeft) => {
    ToastAndroid.show('Pobieranie zakończone', 1)

    ProgressBarValues.Shown = 0
    ProgressBarValues.Written = 0
    ProgressBarValues.ExpectedToWrite = 0

    Animations.DownloadProgressBarBottomOut.start()
    Animated.timing(DownloadProgressBarBorderLeft, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false
    }).start()
}