import * as React from 'react';
import { Text, View, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer} from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import ColorPicker from 'react-native-wheel-color-picker'
import Ionicons from 'react-native-vector-icons/Ionicons';

import CalculatorView from './components/Views/CalculatorView';
import ExchangeView from './components/Views/ExchangeView'
import DistanceView from './components/Views/DistanceView'
import SettingsView from './components/Views/SettingsView'

const Tab = createMaterialBottomTabNavigator();

export default class App extends React.Component {
  state = {
    primaryColor: "#00aeef",
    secoundaryColor: "#ffffff",
    AppTheme: {
      colors: {
        primary: "#00aeef",
        background: "#ffffff",
        text: '#000',
      }
    }
  };

  componentDidMount(){
    this._retrieveData();
  }

  // ZAPISZ KOLORY
  _storeData = async () => {
  try {
    const jsonValue = JSON.stringify(this.state.AppTheme)
    await AsyncStorage.setItem('@AppTheme', jsonValue)
  } catch (e) {
      console.log("Error Saving Data!")
    }
  };

  // ODCZYTAJ
  _retrieveData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@AppTheme');
      if (jsonValue !== null) {
        // We have data!!
        const value = JSON.parse(jsonValue)
        //console.log(value);
        this.setState({
          AppTheme: value
        })
      }
    } catch (error) {
      console.log("Error Retrieving Data")
    }
  };

  changeColor(type,value){

    // Tymczasowe przechowanie kolorów
    let newColor = this.state.AppTheme.colors

    let resetValue = false;

    // Switch
    switch(type){
      case "primary":           {newColor.primary = value; break;}
      case "primary-reset":     {newColor.primary = this.state.primaryColor; resetValue=true; break;}
      case "background":        {newColor.background = value; break}
      case "background-reset":  {newColor.background = this.state.secoundaryColor; resetValue=true; break;}
    }

    // Sprawdzanie podobieństwa
    const maxSimilarity = 0.85;
    if((this.colorSimilarity(newColor.primary,newColor.background) < maxSimilarity) || resetValue){

      newColor.text = this.ContrastColor(newColor.background)

      // Zmiana Koloru
      this.setState(prevState => ({
        ...prevState,
        AppTheme: {
            ...prevState.AppTheme,
            colors: {
                ...prevState.AppTheme.colors,
                newColor
            }
        }
      }))
      
      this._storeData();
    }else{
      console.log("colors to similar")
    }

  }

  // Podobieństwo kolorów
  colorSimilarity(pHex,bHex){
    let primary = [0,0,0]
    let background = [0,0,0]

    primary[0] = "0x" + pHex[1] + pHex[1];
    primary[1] = "0x" + pHex[2] + pHex[2];
    primary[2] = "0x" + pHex[3] + pHex[3];

    background[0] = "0x" + bHex[1] + bHex[1];
    background[1] = "0x" + bHex[2] + bHex[2];
    background[2] = "0x" + bHex[3] + bHex[3];

    var r = (255 - Math.abs(primary[0] - background[0])) / 255;
    var g = (255 - Math.abs(primary[1] - background[1])) / 255;
    var b = (255 - Math.abs(primary[2] - background[2])) / 255;

    return (r + g + b) / 3;
  }

  // Kontrastowy Kolor
  ContrastColor(h) {
    let r = 0, g = 0, b = 0;

    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];

    var brightness = r*0.299 + g*0.587 + b*0.114
    
    return (brightness > 160) ? "#000" : "#fff"
  }

  OpenCalculatorView = () => {
    return <CalculatorView/>;
  }

  OpenExchangeView = () => {
    return <ExchangeView/>;
  }

  OpenDistanceView = () => {
    return <DistanceView/>;
  }

  OpenSettingsView = () => {
    return <SettingsView changeColor={this.changeColor.bind(this)}/>;
  }

  render() {
    return (
      <NavigationContainer theme={this.state.AppTheme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Kalkulator') {iconName = "calculator-outline"}
                if (route.name === 'Waluty')   {iconName = "cash-outline"}
                if (route.name === 'Odległość')   {iconName = "resize-outline"}
                if (route.name === 'Ustawienia')   {iconName = "options-outline"}

                return <Ionicons name={iconName} size={25} color={color} />;
              }
            })}

            initialRouteName="Calculator"
            activeColor="#ffffff"
            inactiveColor="#000000"
          >
        
          <Tab.Screen name="Kalkulator" component={this.OpenCalculatorView} />
          <Tab.Screen name="Waluty"   component={this.OpenExchangeView}   />
          <Tab.Screen name="Odległość"   component={this.OpenDistanceView}   />
          <Tab.Screen name="Ustawienia"   component={this.OpenSettingsView}   />

        </Tab.Navigator>
      </NavigationContainer>
    );
  }
  
}