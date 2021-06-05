import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SquareButton } from '../../components/SquareButton';

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
  title: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  historyList: {
    flexDirection: 'column',
  },
  listItem: {

  }
})

export class SubjectHistory extends Component {
  render() {
    return (
      <View>
        <Text style={[styles.text, styles.title]}>Subject History</Text>
        <View style={[styles.text, styles.historyList]}>
          {
            this.props.history.map((item, index) => {
              return (
                <Text 
                  key={index} 
                  style={[styles.text, styles.listItem]}
                >
                  {item}
                </Text>
              )
            })
          }
        </View>
        <SquareButton
          text='Delete History'
          onPress={this.props.onDeleteButtonPress}
        ></SquareButton>
      </View>
    )
  }
}