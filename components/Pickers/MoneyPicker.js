import * as React from 'react';
import {Picker} from '@react-native-picker/picker';
import { useTheme } from '@react-navigation/native';

function MoneyPicker(props){
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

      <Picker.Item label="Dolar Amerykański"  value="USD" />
      <Picker.Item label="Euro"               value="EUR" />
      <Picker.Item label="Złoty Polski"       value="PLN" />
      <Picker.Item label="Dolar Austalijski"  value="AUD" />
      <Picker.Item label="Dolar Canadyjski"   value="CAD" />
      <Picker.Item label="Forint Węgierski"   value="HUF" />
      <Picker.Item label="Frank Szwajcarski"  value="CHF" />
      <Picker.Item label="Funt Brytyjski"     value="GBP" />
      <Picker.Item label="Korona Czeska"      value="CZK" />
      <Picker.Item label="Lej Rumuński"       value="RON" />
      <Picker.Item label="Lew Bułgarski"      value="BGN" />
      <Picker.Item label="Lir Turecki"        value="TRY" />
      <Picker.Item label="Peso Kolumbijskie"  value="COP" />
      <Picker.Item label="Peso Meksykańskie"  value="MXN" />
      <Picker.Item label="Rial Saudyjski"     value="SAR" />
      <Picker.Item label="Rubel Rosyjski"     value="RUB" />
      <Picker.Item label="Yen Japośki"        value="JPY" />
      <Picker.Item label="Yuan Chiński"       value="CNY" />

    </Picker>
  )
}

export default MoneyPicker