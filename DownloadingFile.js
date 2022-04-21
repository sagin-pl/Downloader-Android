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

export const DownloadFile = async (States, Animations, VideoURLs, VideoNames, DownloadProgressBarBorderLeft, AppProcessState) => {
    if(ItemsInQueue>0) {
        ToastAndroid.show('Poczekaj, aż poprzedni plik się pobierze', 2)
        return
    } else {
        ProgressBarValues.Shown = 0
        ProgressBarValues.Written = 0
        ProgressBarValues.ExpectedToWrite = 0
        Animations.DownloadProgressBarBottomOut.start()
    }

    Animations.DownloadProgressBarBottomIn.start()

    ToastAndroid.show('Pobieranie rozpoczęte', 2)
    DownloadButtonState('off', States)

    for(let i = 0; i<VideoURLs.length; i++) {
        const url = VideoURLs[i]
        let FileUri = FileSystem.documentDirectory + VideoNames[i]

        UpdateBytesToWrite(url)

        ItemsInQueue = ItemsInQueue+1
        FileSystem.downloadAsync(url, FileUri)
            .then(({ uri }) => {
                DownloadButtonState('on', States)
                saveFile(uri)
            })
            .catch(error => {
                DownloadButtonState('on', States)
                ToastAndroid.show(error, 2)
                console.log(error)
            })

        await UpdateBytesWritten(FileUri, 0)
    }
    UpdateDownloadProgressBar(States, Animations, DownloadProgressBarBorderLeft, AppProcessState)
}

const UpdateDownloadProgressBar = (States, Animations, DownloadProgressBarBorderLeft, AppProcessState) => {
    if(ProgressBarValues.Written === ProgressBarValues.ExpectedToWrite && ProgressBarValues.Written>0 || ProgressBarValues.Written === ProgressBarValues.ExpectedToWrite+1 && ProgressBarValues.Written>0) {
        ToastAndroid.show('Pobieranie zakończone', 2)
        ProgressBarValues.Shown=0
        Animations.DownloadProgressBarBottomOut.start()
    } else {
        if (ProgressBarValues.Shown === 0) {
            ProgressBarValues.Shown = 1
            Animations.DownloadProgressBarBottomIn.start()
        }

        if(ProgressBarValues.ExpectedToWrite===0) {
            let progress = ProgressBarValues.Written/1000000
            States.setDownloadProgressBarPercentage(progress.toFixed(2))
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

        setTimeout(function(){ UpdateDownloadProgressBar(States, Animations, DownloadProgressBarBorderLeft, AppProcessState) }, 200)
    }
}

const UpdateBytesWritten = async (FileUri, LastSize) => {
    const { size } = await FileSystem.getInfoAsync(FileUri)
    if(size-LastSize>=0) {
        ProgressBarValues.Written = ProgressBarValues.Written+(size-LastSize)
    } else {
        ProgressBarValues.Written = size
    }

    if(LastSize!==undefined) {
        if (size !== LastSize) {
            setTimeout(function(){UpdateBytesWritten(FileUri, size)}, 200)
        } else {
            ProgressBarValues.ExpectedToWrite = ProgressBarValues.Written+1
        }
    } else {
        setTimeout(function(){UpdateBytesWritten(FileUri, size)}, 200)
    }
}

const UpdateBytesToWrite = (url) => {
    const http = new XMLHttpRequest()
    http.open('HEAD', url, true)
    http.onreadystatechange = function () {
        if (this.readyState === this.DONE) {
            if (this.status === 200) {
                ProgressBarValues.ExpectedToWrite = ProgressBarValues.ExpectedToWrite + parseInt(this.getResponseHeader('content-length'))
            }
        }
    }

    http.send()
}

const saveFile = async (fileUri) => {
    ItemsInQueue = ItemsInQueue-1

    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY)
    if (status === "granted") {
        const asset = await MediaLibrary.createAssetAsync(fileUri)
        await MediaLibrary.createAlbumAsync('SaginDownloader', asset, false)
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