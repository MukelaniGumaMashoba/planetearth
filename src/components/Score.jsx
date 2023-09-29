import React from 'react';
import { View, Text, Button } from 'react-native';

const ResultsScreen = ({score}) => {
  return (
    <View>
      <Text>Your score is: {score}</Text>
    </View>
  );
};

export default ResultsScreen;