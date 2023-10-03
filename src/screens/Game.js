import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image, ToastAndroid } from 'react-native';
import { addScore } from '../database/database';
import { UserContext } from '../../userCtxt';

const GameScreen = () => {

  const { user } = useContext(UserContext);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const fadeAnim = new Animated.Value(0);

  const questions = [
    {
      question: 'What is the capital of France?',
      options: ['A. Paris', 'B. Madrid', 'C. London', 'D. Berlin'],
      correctAnswer: 'A. Paris',
    },
    {
      question: 'What is the largest planet in our solar system?',
      options: ['A. Venus', 'B. Jupiter', 'C. Mars', 'D. Saturn'],
      correctAnswer: 'B. Jupiter',
    },
    {
      question: 'What is the smallest country in the world?',
      options: ['A. Vatican City', 'B. Monaco', 'C. iechtenstein', 'D. San Marino'],
      correctAnswer: 'A. Vatican City',
    },
  ];

  const handleAnswer = async (answer) => {
    const isCorrect = answer === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }


    const nextQuestion = currentQuestion + 1;
    
    if (nextQuestion <= questions.length) {
      setCurrentQuestion(nextQuestion);
    }
    else {
      const result = await addScore(user.uid, score)

      if (result) {
        ToastAndroid.showWithGravity("Score saved.", ToastAndroid.LONG, ToastAndroid.TOP)
      } else {
        ToastAndroid.showWithGravity("Error saving your score", ToastAndroid.SHORT, ToastAndroid.TOP)
      }
    }

  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.question,
        //{ opacity: fadeAnim }
      ]}>
        {questions[currentQuestion]?.question}
      </Animated.Text>
      {questions[currentQuestion].options.map((option, index) => (
        <TouchableOpacity key={index} onPress={() => handleAnswer(option)}>
          <View style={styles.optionButton}>
            <Text style={styles.optionText}>{option}</Text>
          </View>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={() => { setScore(0), setCurrentQuestion(0) }}
        style={styles.btn}
      >
        <Text style={styles.optionText}>Restart Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: "black"
  },
  optionButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 15,
    borderRadius: 10,
    width: 155,
  },
  optionText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  score: {
    fontSize: 18,
    marginTop: 20,
  },
  btn: {
    margin: 40,
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#3498db',
  },
  txt: {
    color: 'white',
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 30,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GameScreen;
