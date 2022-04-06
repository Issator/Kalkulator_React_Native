import * as React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import { useTheme } from '@react-navigation/native';

import SettingsButton from '../Buttons/SetttingsButton';

export default class SettingsView extends React.Component{
  state = {
    textOne: "kolor główny",
    textTwo: "kolor tła",
  }
  
  changeColor = (type) => {
    this.props.changeColor(type,this.state.color)
  }

  render(){

    return(
      <View style={styles.flexOneCenter}>

        <View style = {{flex: 1}}>

          <SettingsText text={this.state.textOne}/>
          <View style={styles.row}>
            <SettingsButton title="Zmień"    onPress={() => {this.changeColor("primary")}}/>
            <SettingsButton title="Domyślny" onPress={() => {this.changeColor("primary-reset")}} color="red"/>
          </View>

          <SettingsText text={this.state.textTwo}/>
          <View style={styles.row}>
            <SettingsButton title="Zmień"    onPress={() => {this.changeColor("background")}}/>
            <SettingsButton title="Domyślny" onPress={() => {this.changeColor("background-reset")}} color="red"/>
          </View>

        </View>
        <View style = {{flex: 2, padding: '20px'}}>
          <ColorPicker
              color = {this.state.color} 
              onColorChangeComplete = {(color) => {this.setState({color: color})}}
          />
        </View>
      </View>
    )
  }
}

const SettingsText = props => {
  const { colors } = useTheme();
  return(
    <View style={styles.flexOneCenter}>
      <Text style={{
        color: colors.text,
        alignSelf: "stretch",
        textAlign: "center",
        margin: 6,
        padding: 6,
        fontSize: 40
      }}>{props.text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row"
  },
  flexOneCenter: {
     flex: 1,
     justifyContent: "center"
  }
});