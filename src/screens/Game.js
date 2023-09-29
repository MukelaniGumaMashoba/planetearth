import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const GameScreen = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const fadeAnim = new Animated.Value(0);

  const questions = [
    {
      question: 'What is the capital of France?',
      options: ['Paris', 'Madrid', 'London', 'Berlin'],
      correctAnswer: 'Paris',
    },
    {
      question: 'What is the largest planet in our solar system?',
      options: ['Venus', 'Jupiter', 'Mars', 'Saturn'],
      correctAnswer: 'Jupiter',
    },
    {
      question: 'What is the smallest country in the world?',
      options: ['Vatican City', 'Monaco', 'Liechtenstein', 'San Marino'],
      correctAnswer: 'Vatican City',
    },
  ];

  const handleAnswer = (answer) => {
    const isCorrect = answer === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
      alert('Quiz Over! You have earned ' + score + ' points');
    }
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.question, { opacity: fadeAnim }]}>
        {questions[currentQuestion].question}
      </Animated.Text>
      {questions[currentQuestion].options.map((option, index) => (
        <TouchableOpacity key={index} onPress={() => handleAnswer(option)}>
          <View style={styles.optionButton}>
            <Text style={styles.optionText}>{option}</Text>
          </View>
        </TouchableOpacity>
      ))}
      <Text style={styles.score}>Score: {score}</Text>
      <TouchableOpacity onPress={() => { setScore(0), setCurrentQuestion(0) }}
        style={styles.btn}

      >
        <Text style={styles.txt}>Restart Game</Text>
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
  },
  optionButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 15,
    borderRadius: 10,
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
    backgroundColor: 'grey',
  },
  txt: {
    color: 'white',
  }
});

export default GameScreen;
