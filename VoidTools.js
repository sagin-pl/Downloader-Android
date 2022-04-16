import {BackHandler} from 'react-native';

export const Sleep = ms => new Promise(r => setTimeout(r, ms))
export const GetRandomInt = (max) => {return Math.floor(Math.random() * max)}
export const Countdown = async (States, sec) => {
    await Sleep(1000)
    States.setExitAppCountdown(sec)
    if(sec===0) BackHandler.exitApp()
    else Countdown(States, sec-1)
}