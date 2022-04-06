import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useTheme } from '@react-navigation/native';

const MyButton = (props) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
      onPress={props.onPress}
    >
      <Text
        style={{
          color: colors.text,
          alignSelf: "stretch",
          textAlign: "center",
          fontWeight: 'bold',
          fontSize: 30
        }}
      >
        {props.val}
      </Text>
    </TouchableOpacity>
  );
};

export default MyButton;