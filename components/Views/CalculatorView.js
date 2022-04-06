import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';

import MyButton from "../Buttons/myButton";
import FunButton from "../Buttons/funButton";
import MyScrollView from "../MyScrollView";

var mexp = require('math-expression-evaluator');

export default class CalculatorView extends React.Component{
  state = {
    toCalcNum: "",
    calcResult: "",
    canPressDot: true
  };

  onPress = (value) => {
    switch(value){
      // LICZBY
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9": 
      case "pi":
      case "e":{this.numPress(value); break;}

      // FUNKCJE
      case "ln(":
      case "log(":
      case "root(":
      case "sin(":
      case "cos(":
      case "tan(": {this.funcPress(value); break;}

      // OPERATORY
      case "^":
      case "/":
      case "*":
      case "-":
      case "+": 
      case "!": {this.lastIsChar(value); break;}

      // USUWANIE
      case "AC" : {
        this.setState({
          toCalcNum: "",
          calcResult: "",
          canPressDot: true
        });
        break;
      }
      case "C": {this.removeLast(); break;}

      // KROPKA
      case ".": {this.pressDot(); break;}

      // OBLICZANIE
      case "=": {this.calculateResult(); break;}

      // NAWIASY
      case "(":
      case ")": {this.addBracket(value); break;}
    }
  };

  addBracket = (value) => {
    let last = this.state.toCalcNum.slice(-1);
    if( last != "."){
      this.setState({
        toCalcNum: this.state.toCalcNum + value
      })
    }
  }

  calculateResult = () => {
    try{
      var valTest = mexp.eval(this.state.toCalcNum);
      if (valTest !== undefined) { 
        this.setState({calcResult: valTest})
      }
    }catch{
      console.log("złe Dane");
      this.setState({calcResult: "err"})
    }
  }

  pressDot(){
    if(this.state.canPressDot && this.state.calcResult == ""){
      let last = this.state.toCalcNum.slice(-1);
      if(last >= '0' && last <= '9'){
        this.setState({
          toCalcNum: this.state.toCalcNum + ".",
          canPressDot: false
        })
      }
    }
  }

  removeLast = () => {
    if(this.state.calcResult != ""){
      this.setState({
          toCalcNum: "",
          calcResult: "",
          canPressDot: true
        });
    } else if(this.state.toCalcNum != 0){
      let last = this.state.toCalcNum.slice(-1);
      if(last == "."){
        this.setState({
          canPressDot: true
        })
      }
      this.setState({
        toCalcNum: this.state.toCalcNum.slice(0,-1)
      })
    }
  }

  lastIsChar = (value) => {
    if(this.state.calcResult != ""){
      this.setState({
        toCalcNum: this.state.calcResult + value,
        calcResult: "",
        canPressDot: true
      })
    }else if(this.state.toCalcNum != ""){
      let last = this.state.toCalcNum.slice(-1);
      if(last == "^" || last == "/" || last == "*" || 
         last == "-" || last == "+" || last == "!" || last == "."){
           this.setState({
             toCalcNum: this.state.toCalcNum.slice(0,-1) + value,
             canPressDot: true
           })
      }else{
        this.setState({
          toCalcNum: this.state.toCalcNum + value,
          canPressDot: true
        })
      }
    }else if(value=="-"){
      this.setState({toCalcNum: "-"})
    }
  }

  funcPress = (value) => {
    if(this.state.calcResult != ""){
      const newValue = value + this.state.calcResult + ")"
      this.setState({
        toCalcNum: newValue,
        calcResult: "",
        canPressDot: true
      })
    }else{
      this.setState({toCalcNum: this.state.toCalcNum + value})
    }
  }

  numPress = (value) => {
    if(this.state.calcResult.length != 0){
      this.setState({
        toCalcNum: value,
        calcResult: ""
      })
    }else{
      this.setState({toCalcNum: this.state.toCalcNum + value})
    }
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          {flexDirection: "column"}
        ]}>

        <View style={{ flex: 2, margin: '10px'}}>
          <MyScrollView text={this.state.toCalcNum} moveToEnd={true}/>
        </View>

        <View style={{ flex: 2, margin: '10px'}}>
          <MyScrollView text={this.state.calcResult}/>
        </View>

        <View style={styles.row}>
          <MyButton val="ln" onPress={() => this.onPress("ln(")} />
          <MyButton val="log" onPress={() => this.onPress("log(")} />
          <MyButton val="root" onPress={() => this.onPress("root(")} />
          <MyButton val="!" onPress={() => this.onPress("!")} />
          <MyButton val="^" onPress={() => this.onPress("^")} />
        </View>

        <View style={styles.row}>
          <FunButton val="AC" onPress={() => this.onPress("AC")} />
          <FunButton val="C" onPress={() => this.onPress("C")} />
          <FunButton val="("  onPress={() => this.onPress("(")}/>
          <FunButton val=")"  onPress={() => this.onPress(")")}/>
          <FunButton val="/" onPress={() => this.onPress("/")} />
        </View>

        <View style={styles.row}>
          <MyButton val="sin" onPress={() => this.onPress("sin(")} />
          <MyButton val="7" onPress={() => this.onPress("7")} />
          <MyButton val="8" onPress={() => this.onPress("8")} />
          <MyButton val="9" onPress={() => this.onPress("9")} />
          <FunButton val="X" onPress={() => this.onPress("*")} />
        </View>

        <View style={styles.row}>
          <MyButton val="cos" onPress={() => this.onPress("cos(")} />
          <MyButton val="4" onPress={() => this.onPress("4")} />
          <MyButton val="5" onPress={() => this.onPress("5")} />
          <MyButton val="6" onPress={() => this.onPress("6")} />
          <FunButton val="-" onPress={() => this.onPress("-")} />
        </View>

        <View style={styles.row}>
          <MyButton val="tan" onPress={() => this.onPress("tan(")} />
          <MyButton val="1" onPress={() => this.onPress("1")} />
          <MyButton val="2" onPress={() => this.onPress("2")} />
          <MyButton val="3" onPress={() => this.onPress("3")} />
          <FunButton val="+" onPress={() => this.onPress("+")} />
        </View>

        <View style={styles.row}>
          <MyButton val="pi" onPress={() => this.onPress("pi")}/>
          <MyButton val="e" onPress={() => this.onPress("e")}/>
          <MyButton val="0" onPress={() => this.onPress("0")} />
          <MyButton val="." onPress={() => this.onPress(".")} />
          <FunButton val="=" onPress={() => this.onPress("=")} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flex: 1,
    flexDirection: "row"
  }
});