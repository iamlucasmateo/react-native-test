import React, { useState } from 'react';
import {Text, View, StyleSheet} from 'react-native';

import { colors } from '../utils/colors';
import { fontSizes } from '../utils/sizes';

const minutesToMillis = mins => mins * 60 * 1000;
const formatTime = time => time < 10 ? `0${time}` : time;

export const Countdown = ({
  minutes = 20,
  isPaused,
  ...props
}) => {
  
  const [millis, setMillis] = useState(minutesToMillis(minutes));
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;
  return (
    <Text style={[styles.text, styles.count]}>{formatTime(minute)}:{formatTime(seconds) }</Text>
  )
};

const styles = StyleSheet.create({
  text: {
    color: colors.white,
    textAlign: 'center',
  },
  count: {
    fontSize: fontSizes.xxl,
  }
})