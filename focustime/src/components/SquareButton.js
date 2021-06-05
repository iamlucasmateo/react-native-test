import React from 'react';
import { TouchableOpacity, Button, Text, StyleSheet, View } from 'react-native';

export const SquareButton = props => {
  return (
    <View style={{marginTop: 10, alignItems: 'center'}}>
      <Button 
        title={props.text}
        color={props.color}
        onPress={props.onPress}
      />
    </View>
  )
}

// const styles = (size) => (
//   StyleSheet.create({
//     radius: {
//       borderRadius: size / 2,
//       width: size,
//       height: size,
//       alignItems: 'center',
//     }
//   })
// ) 