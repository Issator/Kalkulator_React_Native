import React from 'react';
import { Text, View, StyleSheet,TextInput, SafeAreaView} from 'react-native';
import {Picker} from '@react-native-picker/picker';


import MyButton from "../Buttons/myButton";
import FunButton from "../Buttons/funButton";
import MyScrollView from "../MyScrollView";
import MoneyPicker from '../Pickers/MoneyPicker';

import getConnection from "../connection";

export default class ExchangeView extends React.Component{

  state = {
    fromPicker: 'PLN',
    toPicker: 'USD',

    fromValue: "0",
    toValue: "0",

    canPressDot: true
  }

  updatefromPicker = (val) => {this.setState({ fromPicker: val })}
  updatetoPicker   = (val) => {this.setState({ toPicker:   val })}

  onPress = (val) =>{
    switch(val){
      case "AC":
      {
        this.setState({
          fromValue: "0",
          canPressDot: true
          })
        break;
      }
      case "=":
      {
        this.calculateResult();
        break;
      }
      case ".":
      {
        if(this.state.canPressDot)
        {
          this.setState({
            fromValue: this.state.fromValue + val,
            canPressDot: false
          })
        }
        break;
      }
      default: 
      {
        if(this.state.fromValue == "0")
        {
          this.setState({fromValue: val})
        } else {
          this.setState({fromValue: this.state.fromValue + val})
        }
        break;
      }
    }
  }

  calculateResult = () =>
  {
    if(getConnection()){
      var result = "";
      const API = "22804e2c8d8e0edeb5de4527"
      const URL = "https://v6.exchangerate-api.com/v6/" + API +"/pair/" + this.state.fromPicker + "/" + this.state.toPicker + "/" + this.state.fromValue

      fetch(URL)
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          this.setState({toValue: json.conversion_result})
        })
        .catch((error) => console.log(error))
    }else{
      console.log("No internet connection!")
    }
    
  }

  render()
  {
    return(
      <View style={{ flex: 1, justifyContent: 'center'}}>
        <View style={{ flex: 4}}>

          <View style={styles.row}>
            <View style={styles.flexOneCenter}>
              <MoneyPicker valPicker={this.state.fromPicker} changeValPicker={this.updatefromPicker}/>
            </View>
            <View style={styles.flexOneCenter}>
              <MyScrollView text={this.state.fromValue} moveToEnd={true}/>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.flexOneCenter}>
              <MoneyPicker valPicker={this.state.toPicker} changeValPicker={this.updatetoPicker}/>
            </View>
            <View style={styles.flexOneCenter}>
              <MyScrollView text={this.state.toValue}/>
            </View>
          </View>

        </View>

        {calculatorButtons(this.onPress)}
      </View>
    )
  }
}

function calculatorButtons(onPress){
  return(
    <View style={{ flex: 4}}>
          <View style={{ flex: 2, flexDirection: "row"}}>

            <View style={{ flex: 4}}>
              <View style={styles.row}>
                <MyButton val="7" onPress={() => onPress("7")} />
                <MyButton val="8" onPress={() => onPress("8")} />
                <MyButton val="9" onPress={() => onPress("9")} />
              </View>

              <View style={styles.row}>
                <MyButton val="4" onPress={() => onPress("4")} />
                <MyButton val="5" onPress={() => onPress("5")} />
                <MyButton val="6" onPress={() => onPress("6")} />
              </View>
            </View>

            <View style={{ flex: 1}}>
              <View style={styles.row}>
                <FunButton val="AC" onPress={() => onPress("AC")} />
              </View>
            </View>
          </View>

          <View style={{ flex: 2, flexDirection: "row"}}>

            <View style={{ flex: 4}}>
              <View style={styles.row}>
                <MyButton val="1" onPress={() => onPress("1")} />
                <MyButton val="2" onPress={() => onPress("2")} />
                <MyButton val="3" onPress={() => onPress("3")} />
              </View>

              <View style={styles.row}>
                <MyButton val=""/>
                <MyButton val="0" onPress={() => onPress("0")} />
                <MyButton val="." onPress={() => onPress(".")} />
              </View>
            </View>

            <View style={{ flex: 1}}>
              <View style={styles.row}>
                <FunButton val="=" onPress={() => onPress("=")} />
              </View>
            </View>
          </View>
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
  },
  pickerStyle: {
    border: "0px",
    fontSize: "15px",
    fontWeight: 'bold'
  }
});