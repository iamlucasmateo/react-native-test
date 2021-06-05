import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { SquareButton } from '../../components/SquareButton'
import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';



export const Focus = props => {
  const [newText, setNewText] = useState('');
  const [inputText, setInputText] = useState('');
  
  const onChangeText = text => {
    setInputText(text);
  }
  const addActivity = () => {
    if (inputText !== '') {
      props.onAddActivity(inputText);
    }
  }
  return (
    <View>
      <Text style={styles.text}>{props.text}</Text>
      <View style={styles.inputView}>
        <TextInput 
          style={styles.textInput}
          onChangeText={onChangeText}
          value={inputText}
          onSubmitEditing={addActivity}
        />
        <SquareButton 
          text="+" 
          color="blue"
          onPress={addActivity}
        />
      </View>
      
    </View>
  )
}

const styles = {
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  inputView: {
    paddingTop: 15, 
    paddingLeft: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    width: '70vw',
    padding: 2,
    marginRight: 15,
  }
}



