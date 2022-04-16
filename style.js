import styled from 'styled-components'
import {Dimensions, Animated, TouchableOpacity, TextInput} from 'react-native'
import {Feather, MaterialIcons, Entypo} from "@expo/vector-icons";

export const res = {
    vh: Dimensions.get('window').height,
    vw: Dimensions.get('window').width
}

export const Container = styled.View`
  height: 100%;
  width: 100%;
`
export const Background = styled.Image`
  position: absolute;
  z-index: -1;
  height: 100%;
  width: 100%;
`
export const ContentCon = styled(Animated.View)`
  opacity: 0.6;
  margin: auto;
  height: 100%;
  width: 80%;
`

// =========================
// ==== TOP MAIN BUTTON ====
// =========================
export const MainCon = styled.View`
  margin: auto;
  width: 100%;
`
export const MainButtonCon = styled(Animated.View)`
  margin-bottom: 5px;
  border-bottom-color: #eee;
  border-left-color: #eee;
  border-top-color: #eee;
  border-radius: 10px;
  height: ${res.vh/18}px;
  width: 100%;
`
export const URLInput = styled(Animated.createAnimatedComponent(TextInput))`
  padding-bottom: 10px;
  text-align: center;
  font-size: 25px;
  color: white;
  height: 100%;
  width: 100%;
`
export const DownloadButtonsCon = styled(Animated.View)`
  flex-direction: row;
  height: 100%;
  width: 100%;
`
export const DownloadButtonsTouchableCon = styled.View`
  flex-direction: row;
  margin-left: auto;
  margin-right: auto;
`
export const DownloadButtonsTextCon = styled.TouchableOpacity`

`
export const DownloadButtonsText = styled.Text`
  padding-bottom: 10px;
  text-align: center;
  font-size: 25px;
  color: white;
`

// =================
// ==== PREVIEW ====
// =================
export const PreviewCon = styled(Animated.View)`
  margin: auto;
  width: 100%;
`

// ====================
// ==== NAVIGATION ====
// ====================
export const NavRow = styled(Animated.View)`
  margin-top: -5px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: auto;
  flex-direction: row;
  border-top-color: #eee;
  border-radius: 10px;
  height: 65px;
  width: 100%;
`
export const NavButRow = styled.View`
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: auto;
  flex-direction: row;
`
export const NavBut = styled(Animated.createAnimatedComponent(TouchableOpacity))`
  margin: 5px;
  border: 1px solid white;
  border-radius: 15px;
  height: 40px;
  width: 40px;
`
export const NavIcon = styled(Animated.createAnimatedComponent(Feather))`
  text-align: center;
  margin: auto;
`

// =======================
// ==== NAV MINI MENU ====
// =======================
export const NavMiniMenuCon = styled(Animated.View)`
  top: 90%;
  left: ${((res.vw*0.8)/2)-55}px;
  position: absolute;
  width: 110px;
`
export const NavMiniMenuText = styled.Text`
  text-align: center;
  font-size: 15px;
  color: white;
`
export const NavMiniMenuRow = styled.View`
  flex-direction: row;
`
export const NavMiniMenuIconCon = styled.TouchableOpacity`
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: auto;
`
export const NavMiniMenuIcon = styled(MaterialIcons)`
  font-size: 30px;
`

// ================================
// ==== API ERROR NOTIFICATION ====
// ================================
export const APINotificationCon = styled(Animated.View)`
  left: 10%;
  position: absolute;
  height: 150px;
  width: 80%;
`
export const APINotificationHeader = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  height: 30%;
  width: 100%;
`
export const APINotificationHeaderText = styled.Text`
  text-align: center;
  font-size: 30px;
  color: white;
`
export const APINotificationContentCon = styled.View`
  margin-top: 5px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: auto;
  height: 70%;
  width: 80%;
`
export const APINotificationContentText = styled.Text`
  text-align: center;
  font-size: 15px;
  color: white;
`
export const APINotificationCountdownCon = styled.View`
  margin-top: auto;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0px;
  height: 20px;
  width: 80%;
`
export const APINotificationCountdownText = styled.Text`
  text-align: center;
  font-size: 12px;
  color: white;
`

// ===============================
// ==== DOWNLOAD PROGRESS BAR ====
// ===============================
export const DownloadProgressBarCon = styled(Animated.View)`
  position: absolute;
  width: 100%;
  height: 50px;
  bottom: 10px;
`
export const DownloadProgressBarTopRow = styled.View`
  flex-direction: row;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
`
export const DownloadProgressBarText = styled.Text`
  margin-bottom: 6px;
  margin-left: 3px;
  color: white;
`
export const DownloadProgressBarButtonsBar = styled.View`
  flex-direction: row;
  margin-left: auto;
`
export const DownloadProgressBarButtonsCon = styled.TouchableOpacity`
  margin-left: 2px;
  margin-right: 2px;
  border-radius: 0px;
`
export const DownloadProgressBarButtonsIcon = styled(Entypo)`
  font-size: 18px;
  color: white;
`
export const DownloadProgressBar = styled(Animated.View)`
  border: 1px solid white;
  border-radius: 15px;
  width: 80%;
  height: 10px;
  margin-left: auto;
  margin-right: auto;
`