export let ItemsInQueue = 0

export const AddItemToQueue = (hm) => {
    ItemsInQueue=ItemsInQueue+hm
}

export const RemoveItemFromQueue = (hm) => {
    ItemsInQueue=ItemsInQueue-hm
}

export const ClearItemsFromQueue = () => {
    ItemsInQueue=0
}

export let DownloadingFile = false

export const setDownloadingFile = (isDownloading) => {
    DownloadingFile = isDownloading
}