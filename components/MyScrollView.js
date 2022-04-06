import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import { useTheme } from '@react-navigation/native';

const MyScrollView = (props) => {
  const { colors } = useTheme();
  if(props.moveToEnd == true){
    
    return(
      <ScrollView 
            horizontal={true}
            ref={ref => {this.scrollView = ref}}
            onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, alignItems: 'center',flexDirection: 'row-reverse'}}>

      <Text style={{
        color: colors.text,
        fontSize: 60,
        padding: '10px'
      }}>{props.text}</Text>

    </ScrollView>
    )
    
  }else{

    return(
      <ScrollView 
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1, alignItems: 'center',flexDirection: 'row-reverse'}}>

      <Text style={{
        color: colors.text,
        fontSize: 60,
        padding: '10px'
      }}>{props.text}</Text>

    </ScrollView>
    )
  }
}

export default MyScrollView;