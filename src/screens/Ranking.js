import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Box, Heading, Button, Icon, Progress } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function App() {
  const [companies, setCompanies] = useState([
    { name: 'Tesla', emissions: 20, goal: 80 },
    { name: 'Apple', emissions: 45, goal: 80 },
    { name: 'Google', emissions: 35, goal: 80 },
    { name: 'Amazon', emissions: 50, goal: 80 },
    { name: 'Microsoft', emissions: 25, goal: 80 },
    { name: 'Walmart', emissions: 60, goal: 80 },
    { name: 'IBM', emissions: 30, goal: 80 },
    { name: 'Coca-Cola', emissions: 40, goal: 80 },
    { name: 'IKEA', emissions: 15, goal: 80 },
    { name: 'Patagonia', emissions: 10, goal: 80 },
  ]);

  const [showRanking, setShowRanking] = useState(false);

  const rankCompanies = () => {
    const sortedCompanies = [...companies].sort((a, b) => a.emissions - b.emissions);
    setCompanies(sortedCompanies);
    setShowRanking(true);
  };

  const getTrophyColor = (index) => {
    const trophyColors = ['#00A170', '#0074E4', 'teal'];
    return trophyColors[index] || 'gray';
  };

  const getTrophyMessage = (index) => {
    if (index === 0) {
      return 'Congratulations! You are the Eco Champion!';
    } else if (index === 1) {
      return 'Great job! You are a Carbon Conqueror!';
    } else if (index === 2) {
      return 'Well done! You are an Eco Enthusiast!';
    } else {
      return `Keep it up! You are making a positive impact!`;
    }
  };

  return (
      <View style={{ flex: 1, backgroundColor: '#c0e57c', padding: 16 }}>
        {!showRanking ? (
          <View style={styles.container}>
            <View style={styles.content}>
              <Icon as={FontAwesome} name="trophy" size={40} color="white" />
              <Text style={styles.header}>Carbon Emissions Ranking</Text>
              <Text style={styles.description}>
                "Climate change is the single greatest threat to a sustainable future, but, at the same time,
                addressing the climate challenge presents a golden opportunity to promote prosperity, security,
                and a brighter future for all."
              </Text>
              <Text style={styles.subText}>
                Join us in celebrating companies that are taking steps to reduce their carbon emissions and contribute
                to a better future for our planet. Click the button below to see the rankings!
              </Text>
              <Button onPress={rankCompanies} colorScheme="blue">
                Rank Companies
              </Button>
            </View>
          </View>
        ) : (
          <ScrollView>
            <Heading size="md" mb={2} color="white">
              Top Three Ranking
            </Heading>
            {companies.slice(0, 3).map((company, index) => (
              <Box
                key={index}
                bg="white"
                p={4}
                borderRadius={8}
                shadow={2}
                mb={3}
                maxWidth="90%"
              >
                <Text style={{ fontSize: 20, fontWeight: 'bold' }} mb={2}>
                  {company.name}
                </Text>
                <Text fontSize={16} mb={2}>
                  Carbon Emissions: {company.emissions} tons
                </Text>
                <Text fontSize={14} fontWeight="bold" mb={2}>
                  Progress Status Bar
                </Text>
                <Progress
                  value={(company.goal - company.emissions) / company.goal * 100}
                  size="sm"
                  colorScheme="teal"
                  mb={2}
                />
                <Text fontSize={14} fontWeight="bold" mb={2}>
                  Award
                </Text>
                <Box alignItems="center" mb={2}>
                  <Icon as={FontAwesome} name="trophy" size={24} color={getTrophyColor(index)} />
                  <Text fontSize={14} color={getTrophyColor(index)}>
                    {getTrophyMessage(index)}
                  </Text>
                </Box>
              </Box>
            ))}
            <Heading size="md" mb={2} color="white">
              Other Companies
            </Heading>
            {companies.slice(3).map((company, index) => (
              <Box
                key={index}
                bg="white"
                p={4}
                borderRadius={8}
                shadow={2}
                mb={3}
                maxWidth="90%"
              >
                <Text style={{ fontSize: 20, fontWeight: 'bold' }} mb={2}>
                  {company.name}
                </Text>
                <Text fontSize={16} mb={2}>
                  Carbon Emissions: {company.emissions} tons
                </Text>
                <Text fontSize={14} fontWeight="bold" mb={2}>
                  Progress Status Bar
                </Text>
                <Progress
                  value={(company.goal - company.emissions) / company.goal * 100}
                  size="sm"
                  colorScheme="teal"
                  mb={2}
                />
                <Text fontSize={14} fontWeight="bold" mb={2}>
                  {getTrophyMessage(index + 3)}
                </Text>
              </Box>
            ))}
          </ScrollView>
        )}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    margin: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    margin: 16,
  },
  subText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    margin: 16,
  },
});

