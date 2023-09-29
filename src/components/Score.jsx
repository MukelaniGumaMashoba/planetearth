import React from 'react';
import { View, Text, Button } from 'react-native';

const ResultsScreen = ({score}) => {
  return (
    <View>
      <Text>Score: {score}</Text>
    </View>
  );
};

export default ResultsScreen;