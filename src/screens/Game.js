import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image, ToastAndroid } from 'react-native';
import { addScore } from '../database/database';
import { UserContext } from '../../userCtxt';

const GameScreen = () => {

  const { user } = useContext(UserContext);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  // const fadeAnim = new Animated.Value(0);

  const questions = [
    {
      question: 'What are the primary greenhouse gases responsible for global warming?',
      options: ['A. Carbon Doxide',
        'B. Mathane',
        'C. Nitrous Oxide',
        'D. All of the above'],
      correctAnswer: 'D. All of the above',
    },
    {
      question: 'Which human activities contribute significantly to the increase in carbon dioxide emissions?',
      options: ['A. Deforestation',
        'B. Burning fossil fuels',
        'C. Industrial processes',
        'D. All of the above'],
      correctAnswer: 'D. All of the above',
    },
    {
      question: 'What is the main impact of global warming on sea levels and coastal areas?',
      options: ['A. Rising sea levels leading to flooding',
        'B. Decreased salinity in oceans',
        'C. Expansion of marine life habitatsIndustrial processes',
        'D. Reduced wave intensity'],
      correctAnswer: 'A. Rising sea levels leading to flooding',
    },
    {
      question: 'How does global warming affect weather patterns and extreme events?',
      options: ['A. It intensifies hurricanes and typhoons'
        , 'B. It causes prolonged droughts in certain regions'
        , 'C. It leads to heavier rainfall and increased flooding'
        , 'D. All of the above'],
      correctAnswer: 'D. All of the above',
    },
    {
      question: 'What is the role of renewable energy sources in mitigating global warming?',
      options: ['A. They reduce dependence on fossil fuels',
        'B. They produce zero greenhouse gas emissions',
        'C. They promote sustainable development',
        'D. All of the above'],
      correctAnswer: 'D. All of the above',
    },
    {
      question: 'How can individuals contribute to limiting global warming in their daily lives?',
      options: ['A. Reduce, reuse, and recycle'
        , 'B. Use energy-efficient appliances and vehicles'
        , 'C. Plant trees and support reforestation efforts'
        , 'D. All of the above'],
      correctAnswer: 'D. All of the Above',
    },
    {
      question: 'Which of these practices promote eco-friendly living and conservation?',
      options: ['A. Reduce, reuse, and recycle',
        'B. Use energy-efficient appliances and vehicles',
        'C. Plant trees and support reforestation efforts',
        'D. All of the above'],
      correctAnswer: 'D. All of the above',
    },
    {
      question: 'What international agreements aim to address global warming and climate change?',
      options: ['A. Kyoto Protocol',
        'B. Paris Agreement',
        'C. Montreal Protocol',
        'D. All of the above'],
      correctAnswer: 'D. All of the above',
    },
    {
      question: 'What is the potential consequence of failing to limit global warming?',
      options: ['A. Loss of biodiversity', 'B. Displacement of communities due to rising sea levels',
        'C. Increased frequency of severe heatwaves', 'D. All of the above'],
      correctAnswer: 'D. All of the above',
    },
    {
      question: 'What are the Renewable energy resources ?',
      options: ['A. Solar', 'B. Wind', 'C. Hydroelectric','D. Geothermal energy.','E. None of the Above'],
      correctAnswer: 'D. All of the above',
    },
    {
      question: 'What is the most used strategy to limit global warming?',
      options: ['A. renewable energy sources.',
        'B. Cleaning Dirt',
        'C. Coding Html',
        'D. All of the above'],
      correctAnswer: 'A. renewable energy sources.',
    },
  ];

  const handleAnswer = async (answer) => {
    const isCorrect = answer === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 12);
    }


    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {
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
    width: 335,
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
