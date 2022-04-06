import React from "react";
import {View, Button} from 'react-native';
import { useTheme } from '@react-navigation/native';

const SettingsButton = (props) => {
  const { colors } = useTheme();

  return(
    <View style={{
      flex: 1,
      justifyContent: "center",
      padding: '5px'
    }}>
        <Button title={props.title} onPress={props.onPress} color={props.color!=undefined ? props.color : colors.primary}/>
    </View>
  )
}

export default SettingsButton;