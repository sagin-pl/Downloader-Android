import AsyncStorage from '@react-native-async-storage/async-storage'
import {ToastAndroid, Animated} from 'react-native'

import * as MediaLibrary from 'expo-media-library'
import * as FileSystem from 'expo-file-system'
import * as Permissions from 'expo-permissions'

// import {res} from "./style"
// import {Sleep} from "./VoidTools";
// import {DownloadingFile} from "./DownloadingQueue";

let ProgressBarValues = {
    Shown: 0,
    Written: 0,
    ExpectedToWrite: 0
}

export const DownloadFile = async (States, Animations, VideoURLs, VideoNames, VideoSelected, DownloadProgressBarBorderLeft) => {
    ToastAndroid.show('Pobieranie rozpoczęte', 2)

    for(let i = 0; i<VideoURLs.length; i++) {

        // try {
        //     Animations.DownloadProgressBarBottomIn.start()
        //     ToastAndroid.show('Pobieranie rozpoczęte', 2)
        //     const { uri, status, headers } = await downloadResumable.downloadAsync();
        //     console.log(status)
        //     console.log(headers)
        //     Animations.DownloadProgressBarBottomOut.start()
        //     ToastAndroid.show('Pobieranie zakończone', 2)
        //     saveFile(uri)
        // } catch (e) {
        //     console.error(e);
        // }

        const url = VideoURLs[i]
        let FileUri = FileSystem.documentDirectory + VideoNames[i];
        FileSystem.downloadAsync(url, FileUri)
            .then(({ uri }) => {
                saveFile(uri);
            })
            .catch(error => {
                ToastAndroid.show(error, 2)
                console.error(error);
            })

        await UpdateBytesWritten(FileUri)
    }
    UpdateDownloadProgressBar(States, Animations, DownloadProgressBarBorderLeft)
}

const UpdateDownloadProgressBar = (States, Animations, DownloadProgressBarBorderLeft) => {
    if(ProgressBarValues.Shown===0) {
        ProgressBarValues.Shown=1
        Animations.DownloadProgressBarBottomIn.start()
    }
}

const UpdateBytesWritten = async (FileUri, LastSize) => {
    const { size } = await FileSystem.getInfoAsync(FileUri)
    ProgressBarValues.Written = ProgressBarValues.Written+size

    if(LastSize!==undefined) {
        if (size !== LastSize) {
            setTimeout(function(){UpdateBytesWritten(FileUri, size)}, 200)
        }
    } else {
        setTimeout(function(){UpdateBytesWritten(FileUri, size)}, 200)
    }
}

const getFileInfo = (fileUri) => {
    setTimeout(async function(){
        const { size } = await FileSystem.getInfoAsync(fileUri)
        console.log('---------------------------------------------')
        console.log('size: ', size)
        getFileInfo(fileUri)
    }, 1000)
}

// const callback = downloadProgress => {
//     const progress = (downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite)*100
//     console.log(downloadProgress.totalBytesExpectedToWrite)
//     if(RefreshProgress) {
//         RefreshProgress=false
//         setTimeout(function() {
//             StateHooks.setDownloadProgressBarPercentage(progress.toFixed(2))
//             Animated.timing(BorderSettings, {
//                 toValue: (res.vw * 0.8) * (progress / 100),
//                 duration: 100,
//                 useNativeDriver: false
//             }).start()
//             RefreshProgress=true
//         },100)
//     }
// }

const saveFile = async (fileUri) => {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY)
    if (status === "granted") {
        const asset = await MediaLibrary.createAssetAsync(fileUri)
        await MediaLibrary.createAlbumAsync('SaginDownloader', asset, false)
    }
}