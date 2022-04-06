import NetInfo from "@react-native-community/netinfo";

export default function getConnection(){
  var isConnect
  NetInfo.addEventListener(state => {
    isConnect = state.isConnected
  });
  return isConnect;
}