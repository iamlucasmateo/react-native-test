import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, AsyncStorage } from 'react-native';
import Constants from 'expo-constants';
import { Focus } from './src/features/focus/Focus';
import { Timer } from './src/features/timer/Timer';
import { SubjectHistory } from './src/features/focus/SubjectHistory'
import { colors } from './src/utils/colors';

export default function App() {
  const [subject, setSubject] = useState(''); 
  const [inputMenu, setInputMenu] = useState(true);
  const [history, setHistory] = useState([]); 
  
  useEffect(() => {
    setHistory(prev => prev.length === 0 ? [subject] : [...prev, subject])
  }, [subject])

  const saveHistory = async () => {
    try {
      await AsyncStorage.setItem('history', JSON.stringify(history))
    } catch(e) {
      console.log(e);
    }
  };

  const loadHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('history');
      if (history && JSON.parse(history).length > 0) {
        setHistory(prev => history);
      } 
    } catch(e) {
      console.log(e);
    }
  };

  useEffect(() => {
    saveHistory();
  }, [history])

  useEffect(() => {
    loadHistory();
  }, [])

  const onAddActivity = inputText => {
    setInputMenu(im => false);
    setSubject(inputText)
  }
  const toMenu = () => {
    setInputMenu(prev => true);
  }
  const deleteHistory = () => {
    setHistory(prev => []);
  }
  return (
    <View style={styles.container}>
      {inputMenu ? (
        <View style={styles.focusWrapper}>
          <Focus 
            text={'What do you want to focus on?'}
            onAddActivity={onAddActivity}
          />
          <SubjectHistory 
            history={history}
            onDeleteButtonPress={deleteHistory}
          />
        </View>
      ) : (
        <Timer text={subject} goBack={() => setInputMenu(prev => true)}/>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: colors.basicBlue,
  },
  focusWrapper: {
    flexDirection: 'column',
  }
});
