import React, { useContext, useState } from 'react';
import { View, Text } from 'react-native';
import { getScore } from '../database/database';
import { UserContext } from '../../userCtxt';
import { useFocusEffect } from '@react-navigation/native';

const ResultsScreen = () => {
  const [score, setScore] = useState(0)
  const { user } = useContext(UserContext);
  useFocusEffect(() => {
    getData()
   
  })
 const getData = async () => {
      const score = await getScore(user.uid);

      if (score?.score){
        setScore(()=>parseInt(score.score))
      }
    }

  return (
    <View>
      <Text>Recent: {score}</Text>
    </View>
  );
};

export default ResultsScreen;