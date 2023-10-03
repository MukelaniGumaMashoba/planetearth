import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getScore } from '../database/database';
import { UserContext } from '../../userCtxt';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const ResultsScreen = () => {
  const [score, setScore] = useState(0)
  const { user } = useContext(UserContext);
  useFocusEffect(() => {
    getData()

  })
  const getData = async () => {
    const score = await getScore(user.uid);

    if (score?.score) {
      setScore(() => parseInt(score.score))
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}> Points Available:</Text>
      <Text style={styles.score}><Icon name="star" size={24} /> : {score}</Text>
    </View>
  );
};

export default ResultsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 20,
    marginBottom: 10,
    // color: '#007BFF',
  },
  score: {
    fontSize: 36,
    fontWeight: 'bold',
    // color: '#4CAF50',
  },
});
