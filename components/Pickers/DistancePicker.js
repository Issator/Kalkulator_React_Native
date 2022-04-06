import * as React from 'react';
import {Picker} from '@react-native-picker/picker';
import { useTheme } from '@react-navigation/native';

function DistancePicker(props){
  const { colors } = useTheme();
  
  return (
    <Picker
      selectedValue={props.valPicker}
      onValueChange={props.changeValPicker}
      style={{
        border: "0px",
        fontSize: "15px",
        fontWeight: 'bold',
        color: colors.text,
        backgroundColor: colors.background
      }}>

        <Picker.Item label="milimetry"      value="0.001" />
        <Picker.Item label="Centymetry"     value="0.01" />
        <Picker.Item label="Metry"          value="1" />
        <Picker.Item label="Decymetry"      value="10" />
        <Picker.Item label="Kilometry"      value="1000" />
        <Picker.Item label="Mile"           value="1609.344" />
        <Picker.Item label="Mile Morskie"   value="1852" />
        <Picker.Item label="Jardy"          value="0.9144" />
        <Picker.Item label="Stopy"          value="0.3048" />

    </Picker>
  )
}

export default DistancePicker