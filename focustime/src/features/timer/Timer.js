import React, { Component } from 'react';
import { View, Text, StyleSheet, Vibration, Platform } from 'react-native';
import { TextInput } from 'react-native-paper';
import { SquareButton } from '../../components/SquareButton'
import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';
import { Countdown } from '../../components/Countdown';
import { useKeepAwake } from 'expo-keep-awake';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';

const getArray = (value, length) => {
  const arr = [];
  for (let i = 0; i < length; i++) arr.push(value);
  return arr;
};

const funcStyles = count => (
  StyleSheet.create({
    progressSquare: {
      width:count*12,
      backgroundColor: "red",
      flexDirection: 'row',
    },
  })
)

const styles = () => (
  StyleSheet.create({
    container: {
      flex: 1,
    },
    
    text: {
      color: colors.white,
      textAlign: 'center',
    },
    title: {
      fontSize: fontSizes.xl,
    },
    task: {
      fontSize: fontSizes.lg,
      fontWeight: 'bold',
    },
    count: {
      fontSize: fontSizes.xxl,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center'
    },
    selectContainer: {
      marginTop: 40,
      flexDirection: 'row',
      justifyContent: 'space-between',
    }
  })
)
  

export class Timer extends Component {
  // useKeepAwake();
  state = {
    count: 20,
    counting: false,
    progBar: getArray(1, 20),
    timeout: '',
  }

  reduceCount = countAux => {
    console.log(countAux);
    this.setState({ count: countAux });
    if ((countAux > 0) && (this.state.counting)) {
      this.state.timeout = setTimeout(this.reduceCount, 1000, countAux - 1);
    } else {
      clearTimeout(this.state.timeout);
      setTimeout(() => {
        this.setState({ count: 20, counting: false });
      }, 1000);
      deactivateKeepAwake();
      this.vibrate();
    }
  }
    
  onPressStartButton = () => {
    if (!this.state.counting) {
      const countAux = this.state.count;
      console.log('press');
      this.setState({ counting: true }, () => this.reduceCount(countAux));
      activateKeepAwake();
    }
  }

  stopTimer = () => {
    clearTimeout(this.state.timeout);
    this.setState({ counting: false });
    deactivateKeepAwake();
  }

  onSelectTime = time => {
    this.setState({ count: time });
  }

  vibrate = () => {
     if (Platform.OS === 'ios') {
       const interval = setInterval(() => Vibration.vibrate(), 1000);
       setTimeout(() => clearInterval(interval), 3000)
     } else {
       Vibration.vibrate(3000);
     }
  }

  goBack

  render = () => {
    return (
      <View style={styles().container}>
        <Text style={[styles().text, styles().title]}>Focusing On</Text>
        <Text style={[styles().text, styles().task]}>{this.props.text}</Text>
        <View style={styles().count}>
          <Text style={[styles().text, styles().count]}>{this.state.count}</Text>
        </View>

        <View style={funcStyles(this.state.count).progressSquare}>
          <Text>{1}</Text>
        </View>
        
        <View style={styles().buttonContainer}>
          { !this.state.counting ? (
            <SquareButton text='Start' color='blue' onPress={this.onPressStartButton}/>
          ) : (
            <SquareButton text='Stop' color='blue' onPress={this.stopTimer}/>
          )}
          
        </View>

        <View style={this.styles().selectContainer}>
          <SquareButton text='30' color='blue' onPress={() => this.onSelectTime(30)}/>
          <SquareButton text='20' color='blue' onPress={() => this.onSelectTime(20)}/>
          <SquareButton text='10' color='blue' onPress={() => this.onSelectTime(10)}/>
        </View>

        <View>
          <SquareButton text="main" color="blue" onPress={this.props.goBack}/>
        </View>
        
      </View>
    )
  }

  
}

